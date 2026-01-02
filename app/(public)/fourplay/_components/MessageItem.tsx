"use client";

import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Turn } from "../_apis/fourplay-api";
import { FOURPLAY_MODELS } from "../_libs/fourplay-models";

interface MessageItemProps {
	turn: Turn;
	isStreaming?: boolean;
	streamingText?: string;
}

export default function MessageItem({
	turn,
	isStreaming,
	streamingText,
}: MessageItemProps) {
	const isUser = turn.role === "user";
	const isAssistant = turn.role === "assistant";

	const modelInfo = turn.model
		? FOURPLAY_MODELS[turn.model as keyof typeof FOURPLAY_MODELS]
		: null;

	// 표시할 텍스트 결정
	const displayText = isStreaming
		? streamingText
		: (turn.payload as Record<string, unknown>)?.markdown ||
			turn.raw_text ||
			"";

	return (
		<div
			className={cn("flex gap-3 p-4", isUser ? "bg-muted/50" : "bg-background")}
		>
			{/* 아이콘 */}
			<div
				className={cn(
					"flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
					isUser ? "bg-primary text-primary-foreground" : "bg-muted",
				)}
			>
				{isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
			</div>

			{/* 메시지 내용 */}
			<div className="flex-1 space-y-2">
				{/* 헤더 */}
				<div className="flex items-center gap-2 text-muted-foreground text-sm">
					{isUser ? (
						<span className="font-medium">You</span>
					) : (
						<>
							<span className="font-medium">
								{modelInfo?.label || turn.model || "Assistant"}
							</span>
							{turn.kind && (
								<span className="rounded bg-muted px-1.5 py-0.5 text-xs">
									{turn.kind}
								</span>
							)}
							{turn.selected_by === "user" && (
								<span className="text-blue-500 text-xs">(user selected)</span>
							)}
						</>
					)}
				</div>

				{/* 본문 */}
				{isStreaming && !streamingText ? (
					<div className="space-y-2">
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-4 w-1/2" />
						<Skeleton className="h-4 w-2/3" />
					</div>
				) : (
					<div className="prose prose-sm dark:prose-invert max-w-none">
						<ReactMarkdown remarkPlugins={[remarkGfm]}>
							{displayText as string}
						</ReactMarkdown>
					</div>
				)}

				{/* Assistant 메타 정보 (payload 요약) */}
				{isAssistant && !isStreaming && turn.payload && (
					<AssistantMeta payload={turn.payload as Record<string, unknown>} />
				)}
			</div>
		</div>
	);
}

function AssistantMeta({ payload }: { payload: Record<string, unknown> }) {
	const conclusion = payload.conclusion as string | undefined;
	const reasons = payload.reasons as string[] | undefined;
	const risks = payload.risks as string[] | undefined;
	const nextModel = payload.nextModel as string | undefined;
	const nextModelReason = payload.nextModelReason as string | undefined;

	if (!conclusion) return null;

	return (
		<Card className="mt-4 border-dashed">
			<CardHeader className="pb-2">
				<p className="font-medium text-sm">Summary</p>
			</CardHeader>
			<CardContent className="space-y-3 text-sm">
				{conclusion && (
					<div>
						<p className="font-medium text-muted-foreground">Conclusion</p>
						<p>{conclusion}</p>
					</div>
				)}

				{reasons && reasons.length > 0 && (
					<div>
						<p className="font-medium text-muted-foreground">Reasons</p>
						<ul className="list-inside list-disc">
							{reasons.map((r, i) => (
								<li key={i}>{r}</li>
							))}
						</ul>
					</div>
				)}

				{risks && risks.length > 0 && (
					<div>
						<p className="font-medium text-muted-foreground">Risks</p>
						<ul className="list-inside list-disc text-orange-600 dark:text-orange-400">
							{risks.map((r, i) => (
								<li key={i}>{r}</li>
							))}
						</ul>
					</div>
				)}

				{nextModel && (
					<div className="rounded bg-muted p-2">
						<p className="text-muted-foreground text-xs">Next recommended:</p>
						<p className="font-medium">{nextModel}</p>
						{nextModelReason && (
							<p className="text-muted-foreground text-xs">{nextModelReason}</p>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
