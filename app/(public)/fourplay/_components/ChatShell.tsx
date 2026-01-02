"use client";

import { Send } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { streamChat, type Turn } from "../_apis/fourplay-api";
import {
	useCreateThread,
	useInvalidateThread,
	useThreadQuery,
	useUpdateThread,
} from "../_hooks/useFourplay";
import type { FourplayModelId } from "../_libs/fourplay-models";
import type { ChatRequest } from "../_libs/fourplay-schema";
import MessageList from "./MessageList";
import ThreadHeader from "./ThreadHeader";
import TurnActions from "./TurnActions";

interface ChatShellProps {
	threadId: string | null;
	onThreadCreated: (threadId: string) => void;
	onBack: () => void;
}

export default function ChatShell({
	threadId,
	onThreadCreated,
	onBack,
}: ChatShellProps) {
	const [inputMessage, setInputMessage] = useState("");
	const [isStreaming, setIsStreaming] = useState(false);
	const [streamingTurnId, setStreamingTurnId] = useState<string | null>(null);
	const [streamingText, setStreamingText] = useState("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const { data: threadData, isLoading: isThreadLoading } =
		useThreadQuery(threadId);
	const createThread = useCreateThread();
	const updateThread = useUpdateThread();
	const invalidateThread = useInvalidateThread();

	const thread = threadData?.thread || null;
	const turns = threadData?.turns || [];
	const assistantTurns = turns.filter((t) => t.role === "assistant");
	const lastAssistantTurn = assistantTurns[assistantTurns.length - 1];
	const isCompleted = thread?.status === "completed";

	// 스트리밍 처리
	const handleStream = useCallback(
		async (request: ChatRequest) => {
			if (!threadId) return;

			setIsStreaming(true);
			setStreamingText("");

			try {
				const stream = await streamChat(request);
				const reader = stream.getReader();
				const decoder = new TextDecoder();

				// 임시 턴 ID 생성 (실제로는 서버에서 생성됨)
				const tempTurnId = `streaming-${Date.now()}`;
				setStreamingTurnId(tempTurnId);

				let fullText = "";

				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					const chunk = decoder.decode(value, { stream: true });
					fullText += chunk;
					setStreamingText(fullText);
				}

				// 스트리밍 완료 후 데이터 새로고침
				invalidateThread(threadId);
			} catch (error) {
				console.error("Streaming error:", error);
				toast.error(
					error instanceof Error ? error.message : "Streaming failed",
				);
			} finally {
				setIsStreaming(false);
				setStreamingTurnId(null);
				setStreamingText("");
			}
		},
		[threadId, invalidateThread],
	);

	// 새 대화 시작
	const handleSubmit = async () => {
		if (!inputMessage.trim()) return;

		if (threadId) {
			// 기존 스레드에 메시지 추가 (현재는 지원 안 함)
			toast.error("Adding messages to existing thread is not supported yet");
			return;
		}

		// 새 스레드 생성
		try {
			const result = await createThread.mutateAsync({
				firstMessage: inputMessage.trim(),
			});
			setInputMessage("");
			onThreadCreated(result.threadId);

			// 첫 번째 AI 응답 요청
			setTimeout(() => {
				handleStream({
					threadId: result.threadId,
					mode: "model",
					userAction: "continue",
				});
			}, 100);
		} catch (error) {
			console.error("Create thread error:", error);
			toast.error("Failed to create conversation");
		}
	};

	// 계속 (제안대로)
	const handleContinue = () => {
		if (!threadId) return;
		handleStream({
			threadId,
			mode: "model",
			userAction: "continue",
		});
	};

	// 계속 (모델 지정)
	const handleContinueWithModel = (model: FourplayModelId) => {
		if (!threadId) return;
		handleStream({
			threadId,
			mode: "model",
			userAction: "continue_with_model",
			selectedModel: model,
		});
	};

	// 요약 진행
	const handleSummary = () => {
		if (!threadId) return;
		handleStream({
			threadId,
			mode: "summary",
			userAction: "summary",
		});
	};

	// 현재 결론으로 종료
	const handleFinish = async () => {
		if (!threadId) return;
		try {
			await updateThread.mutateAsync({
				threadId,
				data: {
					status: "completed",
					final_decision: lastAssistantTurn?.payload as
						| Record<string, unknown>
						| undefined,
				},
			});
			toast.success("Conversation completed");
		} catch (error) {
			console.error("Finish error:", error);
			toast.error("Failed to complete conversation");
		}
	};

	// Enter 키 처리
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	// 스트리밍 중인 턴을 turns 배열에 임시로 추가
	const displayTurns: Turn[] = streamingTurnId
		? [
				...turns,
				{
					id: streamingTurnId,
					thread_id: threadId || "",
					turn_index: turns.length + 1,
					role: "assistant" as const,
					kind: "streaming",
					model: null,
					selected_by: null,
					next_model: null,
					next_model_reason: null,
					payload: null,
					raw_text: null,
					latency_ms: null,
					token_usage: null,
					created_at: new Date().toISOString(),
				},
			]
		: turns;

	return (
		<div className="flex h-full flex-col">
			<ThreadHeader thread={thread} onBack={onBack} />

			<MessageList
				turns={displayTurns}
				streamingTurnId={streamingTurnId}
				streamingText={streamingText}
			/>

			{/* 입력 영역 (새 대화 시작용) */}
			{!threadId && (
				<div className="border-t p-4">
					<div className="flex gap-2">
						<Textarea
							ref={textareaRef}
							value={inputMessage}
							onChange={(e) => setInputMessage(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="What decision do you need help with?"
							className="min-h-[80px] resize-none"
							disabled={createThread.isPending}
						/>
						<Button
							onClick={handleSubmit}
							disabled={!inputMessage.trim() || createThread.isPending}
							size="icon"
							className="h-auto"
						>
							<Send className="h-4 w-4" />
						</Button>
					</div>
					<p className="mt-2 text-muted-foreground text-xs">
						Press Enter to send, Shift+Enter for new line
					</p>
				</div>
			)}

			{/* 턴 액션 버튼 (기존 대화에서만) */}
			{threadId && assistantTurns.length > 0 && !isCompleted && (
				<TurnActions
					nextModel={lastAssistantTurn?.next_model}
					assistantTurnCount={assistantTurns.length}
					isLoading={isStreaming}
					onContinue={handleContinue}
					onContinueWithModel={handleContinueWithModel}
					onSummary={handleSummary}
					onFinish={handleFinish}
				/>
			)}

			{/* 완료 상태 표시 */}
			{isCompleted && (
				<div className="border-t bg-green-50 p-4 text-center dark:bg-green-950">
					<p className="text-green-700 text-sm dark:text-green-300">
						This conversation has been completed.
					</p>
				</div>
			)}
		</div>
	);
}
