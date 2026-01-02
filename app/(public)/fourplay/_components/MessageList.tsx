"use client";

import { useEffect, useRef } from "react";
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

	// 새 메시지가 추가될 때 스크롤
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, []);

	if (turns.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center text-muted-foreground">
				<p>Start a conversation by entering your question below.</p>
			</div>
		);
	}

	return (
		<ScrollArea className="flex-1" ref={scrollRef}>
			<div className="divide-y">
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
