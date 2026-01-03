import { type FlexibleSchema, gateway, Output, streamText } from "ai";
import {
	DEFAULT_MODEL,
	type FourplayModelId,
	getProviderFromModelId,
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
	minimalPayloadSchema,
} from "@/app/(public)/fourplay/_libs/fourplay-schema";
import type { Json } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";

export const maxDuration = 60;

const PROVIDER_SEQUENCE = ["openai", "anthropic", "google"] as const;
type ProviderSequence = (typeof PROVIDER_SEQUENCE)[number];

const PROVIDER_DEFAULT_MODEL: Record<ProviderSequence, FourplayModelId> = {
	openai: DEFAULT_MODEL,
	anthropic: "anthropic/claude-sonnet-4.5",
	google: "google/gemini-3-pro-preview",
};

function getForcedNextModelInfo(
	assistantTurns: { model: string | null }[],
	currentModel: FourplayModelId,
): { model: FourplayModelId; reason: string } {
	const usedProviders = new Set<ProviderSequence>();

	for (const turn of assistantTurns) {
		if (!turn.model) continue;
		const provider = getProviderFromModelId(turn.model) as ProviderSequence;
		if (PROVIDER_SEQUENCE.includes(provider)) {
			usedProviders.add(provider);
		}
	}

	const currentProvider = getProviderFromModelId(
		currentModel,
	) as ProviderSequence;
	if (PROVIDER_SEQUENCE.includes(currentProvider)) {
		usedProviders.add(currentProvider);
	}

	const nextProvider = PROVIDER_SEQUENCE.find(
		(provider) => !usedProviders.has(provider),
	);

	if (nextProvider) {
		return {
			model: PROVIDER_DEFAULT_MODEL[nextProvider],
			reason: `Auto-selected to use remaining provider: ${nextProvider}.`,
		};
	}

	return {
		model: PROVIDER_DEFAULT_MODEL.openai,
		reason: "Auto-selected to wrap up with OpenAI.",
	};
}

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

	const forcedNextModelInfo =
		mode === "summary" ? null : getForcedNextModelInfo(assistantTurns, modelId);

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
		systemPrompt = getFinalSummarySystemPrompt(allResponses) + JSON_INSTRUCTION;
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

		// DB 업데이트 헬퍼 함수 (JSON 파싱 + 스키마 검증 + 복구 로직)
		const updateTurnWithPayload = async (text: string) => {
			// 1. JSON 파싱 시도
			let parsedJson: unknown;
			try {
				parsedJson = JSON.parse(text);
			} catch {
				console.error("JSON parse failed, using minimal payload");
				// JSON 파싱 실패 시 최소 구조 사용
				const minimalPayload = minimalPayloadSchema.parse({
					markdown: text,
					nextModel: DEFAULT_MODEL,
				});
				const normalizedPayload = forcedNextModelInfo
					? {
							...minimalPayload,
							nextModel: forcedNextModelInfo.model,
							nextModelReason: forcedNextModelInfo.reason,
						}
					: minimalPayload;
				const { error: updateError } = await supabase
					.from("fourplay_turns")
					.update({
						payload: normalizedPayload,
						raw_text: text,
						next_model: forcedNextModelInfo?.model ?? null,
						next_model_reason: forcedNextModelInfo?.reason ?? null,
					})
					.eq("id", newTurn.id);
				if (updateError) {
					console.error("Turn update failed (parse fallback):", updateError);
				}
				return;
			}

			// 2. 스키마 검증 시도
			const schema =
				mode === "summary" ? finalSummaryPayloadSchema : assistantPayloadSchema;
			const validationResult = schema.safeParse(parsedJson);

			if (validationResult.success) {
				// 검증 성공
				const payload = validationResult.data;
				const normalizedPayload = forcedNextModelInfo
					? {
							...payload,
							nextModel: forcedNextModelInfo.model,
							nextModelReason: forcedNextModelInfo.reason,
						}
					: payload;
				const { error: updateError } = await supabase
					.from("fourplay_turns")
					.update({
						payload: normalizedPayload,
						payload_raw: parsedJson as Json,
						raw_text: text,
						next_model: forcedNextModelInfo?.model ?? null,
						next_model_reason: forcedNextModelInfo?.reason ?? null,
					})
					.eq("id", newTurn.id);
				if (updateError) {
					console.error("Turn update failed (validated):", updateError);
				}

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
			} else {
				// 3. 스키마 검증 실패 시 최소 구조 사용
				console.error("Schema validation failed:", validationResult.error);
				const jsonObj = parsedJson as Record<string, unknown> | null;
				const minimalPayload = minimalPayloadSchema.parse({
					conclusion: jsonObj?.conclusion,
					reasons: jsonObj?.reasons,
					risks: jsonObj?.risks,
					counterpoints: jsonObj?.counterpoints,
					questions: jsonObj?.questions,
					nextModel: jsonObj?.nextModel || DEFAULT_MODEL,
					nextModelReason: jsonObj?.nextModelReason,
					handoffContext: jsonObj?.handoffContext,
					markdown: text,
				});

				const normalizedPayload = forcedNextModelInfo
					? {
							...minimalPayload,
							nextModel: forcedNextModelInfo.model,
							nextModelReason: forcedNextModelInfo.reason,
						}
					: minimalPayload;
				const { error: updateError } = await supabase
					.from("fourplay_turns")
					.update({
						payload: normalizedPayload,
						payload_raw: parsedJson as Json,
						raw_text: text,
						next_model: forcedNextModelInfo?.model ?? null,
						next_model_reason: forcedNextModelInfo?.reason ?? null,
					})
					.eq("id", newTurn.id);
				if (updateError) {
					console.error("Turn update failed (schema fallback):", updateError);
				}
			}
		};

		// AI 스트리밍 시작 - 모드에 따라 다른 스키마 사용
		const schema =
			mode === "summary" ? finalSummaryPayloadSchema : assistantPayloadSchema;

		const result = streamText({
			model: gateway(modelId),
			system: systemPrompt,
			prompt: userQuestion,
			output: Output.object({ schema: schema as FlexibleSchema }),
		});

		// 스트림을 수동으로 처리하여 클라이언트에 마크다운 스트리밍
		const encoder = new TextEncoder();

		const stream = new ReadableStream({
			async start(controller) {
				let lastMarkdown = "";

				const sendChunk = (type: "append" | "replace", content: string) => {
					controller.enqueue(
						encoder.encode(`${JSON.stringify({ type, content })}\n`),
					);
				};

				try {
					for await (const partial of result.partialOutputStream) {
						const markdown = (partial as { markdown?: string }).markdown;
						if (typeof markdown !== "string") continue;

						if (!lastMarkdown) {
							lastMarkdown = markdown;
							if (markdown) {
								sendChunk("append", markdown);
							}
							continue;
						}

						if (markdown.startsWith(lastMarkdown)) {
							const delta = markdown.slice(lastMarkdown.length);
							if (delta) {
								sendChunk("append", delta);
							}
							lastMarkdown = markdown;
						} else {
							sendChunk("replace", markdown);
							lastMarkdown = markdown;
						}
					}

					// DB 업데이트를 controller.close() 전에 수행해야 Edge 환경에서 누락 방지
					const fullText = await result.text;
					await updateTurnWithPayload(fullText);

					controller.close();
				} catch (error) {
					console.error("Streaming error:", error);
					if (lastMarkdown) {
						try {
							await updateTurnWithPayload(lastMarkdown);
						} catch (saveError) {
							console.error("Failed to save partial result:", saveError);
						}
					}
					controller.error(error);
				}
			},
		});

		return new Response(stream, {
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
				"Transfer-Encoding": "chunked",
			},
		});
	} catch (error) {
		console.error("Fourplay chat error:", error);
		return new Response(
			JSON.stringify({ error: "AI streaming failed", details: String(error) }),
			{ status: 500 },
		);
	}
}
