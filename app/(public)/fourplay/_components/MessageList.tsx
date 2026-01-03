"use client";

import { useCallback, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Turn } from "../_apis/fourplay-api";
import MessageItem from "./MessageItem";

interface MessageListProps {
	turns: Turn[];
	streamingTurnId?: string | null;
	streamingText?: string;
}

export default function MessageList({
	turns,
	streamingTurnId,
	streamingText,
}: MessageListProps) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const turnsLength = turns.length;

	// 스크롤을 최하단으로 이동하는 함수
	const scrollToBottom = useCallback(() => {
		if (scrollRef.current) {
			// ScrollArea의 viewport를 찾아서 스크롤
			const viewport = scrollRef.current.querySelector(
				"[data-radix-scroll-area-viewport]",
			) as HTMLElement;
			if (viewport) {
				viewport.scrollTop = viewport.scrollHeight;
			}
		}
	}, []);

	// 새 메시지가 추가될 때 스크롤
	// biome-ignore lint/correctness/useExhaustiveDependencies: turns.length만 변경될 때 스크롤해야 함
	useEffect(() => {
		scrollToBottom();
	}, [turnsLength, scrollToBottom]);

	// 스트리밍 텍스트가 변경될 때마다 스크롤
	useEffect(() => {
		if (streamingText !== undefined && streamingText !== null) {
			// 약간의 지연을 두어 DOM 업데이트 후 스크롤
			const timeoutId = setTimeout(() => {
				scrollToBottom();
			}, 0);
			return () => clearTimeout(timeoutId);
		}
	}, [streamingText, scrollToBottom]);

	if (turns.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center text-muted-foreground">
				<p>Start a conversation by entering your question below.</p>
			</div>
		);
	}

	return (
		<ScrollArea className="flex-1" ref={scrollRef}>
			<div className="divide-y" ref={contentRef}>
				{turns.map((turn) => (
					<MessageItem
						key={turn.id}
						turn={turn}
						isStreaming={turn.id === streamingTurnId}
						streamingText={
							turn.id === streamingTurnId ? streamingText : undefined
						}
					/>
				))}
			</div>
		</ScrollArea>
	);
}
