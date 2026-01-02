import { gateway, Output, streamText } from "ai";
import {
	DEFAULT_MODEL,
	type FourplayModelId,
	SUMMARY_MODEL,
} from "@/app/(public)/fourplay/_libs/fourplay-models";
import {
	getFinalSummarySystemPrompt,
	getMidSystemPrompt,
	getOpenerSystemPrompt,
	JSON_INSTRUCTION,
} from "@/app/(public)/fourplay/_libs/fourplay-prompts";
import {
	assistantPayloadSchema,
	chatRequestSchema,
	finalSummaryPayloadSchema,
} from "@/app/(public)/fourplay/_libs/fourplay-schema";
import { createClient } from "@/utils/supabase/server";

export const maxDuration = 60;

export async function POST(req: Request) {
	const supabase = await createClient();

	// 인증 확인
	const {
		data: { user: authUser },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !authUser) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
		});
	}

	// admin 권한 확인
	const { data: userData, error: userError } = await supabase
		.from("users")
		.select("isAdmin")
		.eq("id", authUser.id)
		.single();

	if (userError || !userData?.isAdmin) {
		return new Response(
			JSON.stringify({ error: "Private experiment - admin only" }),
			{ status: 403 },
		);
	}

	// body 파싱 및 검증
	const body = await req.json();
	const parseResult = chatRequestSchema.safeParse(body);

	if (!parseResult.success) {
		return new Response(
			JSON.stringify({ error: "Invalid request", details: parseResult.error }),
			{ status: 400 },
		);
	}

	const { threadId, mode, selectedModel, userAction } = parseResult.data;

	// 스레드 확인
	const { data: thread, error: threadError } = await supabase
		.from("fourplay_threads")
		.select("*")
		.eq("id", threadId)
		.single();

	if (threadError || !thread) {
		return new Response(JSON.stringify({ error: "Thread not found" }), {
			status: 404,
		});
	}

	if (thread.status === "completed") {
		return new Response(
			JSON.stringify({ error: "Thread is already completed" }),
			{ status: 400 },
		);
	}

	// 기존 턴들 조회
	const { data: turns, error: turnsError } = await supabase
		.from("fourplay_turns")
		.select("*")
		.eq("thread_id", threadId)
		.order("turn_index", { ascending: true });

	if (turnsError) {
		return new Response(JSON.stringify({ error: turnsError.message }), {
			status: 500,
		});
	}

	const assistantTurns = turns?.filter((t) => t.role === "assistant") || [];
	const lastAssistantTurn = assistantTurns[assistantTurns.length - 1];
	const nextTurnIndex = (turns?.length || 0) + 1;

	// 모델 선택 로직
	let modelId: FourplayModelId;
	let turnKind: string;

	if (mode === "summary") {
		modelId = SUMMARY_MODEL;
		turnKind = "final_summary";
	} else if (userAction === "continue_with_model" && selectedModel) {
		modelId = selectedModel as FourplayModelId;
		turnKind = assistantTurns.length === 0 ? "opener" : "mid";
	} else if (userAction === "continue" && lastAssistantTurn?.next_model) {
		modelId = lastAssistantTurn.next_model as FourplayModelId;
		turnKind = "mid";
	} else {
		modelId = DEFAULT_MODEL;
		turnKind = assistantTurns.length === 0 ? "opener" : "mid";
	}

	// 시스템 프롬프트 생성
	let systemPrompt: string;
	const userTurn = turns?.find((t) => t.role === "user");
	const userQuestion = userTurn?.raw_text || "";

	if (mode === "summary") {
		const allResponses = assistantTurns
			.map((t, i) => {
				const payload = t.payload as Record<string, unknown> | null;
				const conclusion = payload?.conclusion ?? t.raw_text;
				return `### 모델 ${i + 1} (${t.model}):\n${conclusion}`;
			})
			.join("\n\n");
		systemPrompt =
			getFinalSummarySystemPrompt(allResponses) + JSON_INSTRUCTION;
	} else if (turnKind === "opener") {
		systemPrompt = getOpenerSystemPrompt() + JSON_INSTRUCTION;
	} else {
		const lastPayload = lastAssistantTurn?.payload as Record<
			string,
			unknown
		> | null;
		const handoffContext = (lastPayload?.handoffContext as string) || "";
		systemPrompt =
			getMidSystemPrompt(handoffContext, assistantTurns.length + 1) +
			JSON_INSTRUCTION;
	}

	try {
		// 새 assistant 턴 생성 (pending 상태)
		const { data: newTurn, error: insertError } = await supabase
			.from("fourplay_turns")
			.insert({
				thread_id: threadId,
				turn_index: nextTurnIndex,
				role: "assistant",
				kind: turnKind,
				model: modelId,
				selected_by: userAction === "continue_with_model" ? "user" : "auto",
			})
			.select()
			.single();

		if (insertError) {
			return new Response(JSON.stringify({ error: insertError.message }), {
				status: 500,
			});
		}

		// DB 업데이트 헬퍼 함수
		const updateTurnWithPayload = async (text: string) => {
			try {
				const payload = JSON.parse(text);
				const markdown =
					"markdown" in payload
						? (payload.markdown as string)
						: JSON.stringify(payload, null, 2);

				await supabase
					.from("fourplay_turns")
					.update({
						payload,
						raw_text: markdown,
						next_model:
							"nextModel" in payload ? (payload.nextModel as string) : null,
						next_model_reason:
							"nextModelReason" in payload
								? (payload.nextModelReason as string)
								: null,
					})
					.eq("id", newTurn.id);

				// Final summary인 경우 thread 업데이트
				if (mode === "summary") {
					await supabase
						.from("fourplay_threads")
						.update({
							status: "completed",
							final_decision: payload,
						})
						.eq("id", threadId);
				}
			} catch (parseError) {
				console.error("Failed to parse AI response:", parseError);
				await supabase
					.from("fourplay_turns")
					.update({ raw_text: text })
					.eq("id", newTurn.id);
			}
		};

		// AI 스트리밍 시작 - 모드에 따라 다른 스키마 사용
		if (mode === "summary") {
			const result = streamText({
				model: gateway(modelId),
				system: systemPrompt,
				prompt: userQuestion,
				output: Output.object({ schema: finalSummaryPayloadSchema }),
				onFinish: async ({ text }) => {
					await updateTurnWithPayload(text);
				},
			});
			return result.toTextStreamResponse();
		}

		// 일반 모드 (opener / mid)
		const result = streamText({
			model: gateway(modelId),
			system: systemPrompt,
			prompt: userQuestion,
			output: Output.object({ schema: assistantPayloadSchema }),
			onFinish: async ({ text }) => {
				await updateTurnWithPayload(text);
			},
		});

		return result.toTextStreamResponse();
	} catch (error) {
		console.error("Fourplay chat error:", error);
		return new Response(
			JSON.stringify({ error: "AI streaming failed", details: String(error) }),
			{ status: 500 },
		);
	}
}
