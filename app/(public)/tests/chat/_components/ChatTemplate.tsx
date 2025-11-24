"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

function ChatTemplate() {
	const [input, setInput] = useState("");
	const { messages, sendMessage } = useChat();

	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messages.length > 0) {
			messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		sendMessage({
			text: input,
		});
		setInput("");
	};

	return (
		<div className="stretch mx-auto flex w-full max-w-md flex-col gap-4 py-24">
			{messages.map((message) => (
				<div key={message.id} className="w-full whitespace-pre-wrap break-keep">
					{message.role === "user" ? (
						<div className="flex min-h-8 w-full justify-end">
							<p className="flex w-[70%] flex-col items-center bg-black/30 text-end text-cyan-400 text-stroke-green">
								<span className="w-full text-end">🍀 User: </span>
								{message.parts.map((part, i) => {
									switch (part.type) {
										case "text":
											return (
												<span key={`${message.id}-${i}`}>{part.text}</span>
											);
										default:
											return null;
									}
								})}
							</p>
						</div>
					) : (
						<p className="flex w-full flex-col text-left text-neutral-200 text-stroke">
							<span>🧚 AI: </span>
							{message.parts.map((part, i) => {
								switch (part.type) {
									case "text":
										return <span key={`${message.id}-${i}`}>{part.text}</span>;
									default:
										return null;
								}
							})}
						</p>
					)}
				</div>
			))}

			<div ref={messagesEndRef} />

			<form onSubmit={handleFormSubmit}>
				<input
					id="chat-input"
					className="fixed bottom-4 w-full max-w-md border border-neutral-300 bg-neutral-300 p-2 shadow-xl placeholder:text-neutral-500 focus:outline-none focus-visible:outline-none"
					value={input}
					placeholder="Say something..."
					onChange={(e) => setInput(e.target.value)}
				/>
			</form>
		</div>
	);
}

export default ChatTemplate;
