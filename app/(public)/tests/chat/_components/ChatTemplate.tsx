"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";

function ChatTemplate() {
	const { messages, input, handleInputChange, handleSubmit } = useChat({
		onFinish: (_message, options) => {
			// console.log("finished message", message);
			console.log("usage ===>", options.usage);
		},
	});

	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messages.length > 0) {
			messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		handleSubmit(
			{
				preventDefault: () => {
					e.preventDefault();
				},
			},
			{
				body: {
					model: "gpt-4o-mini",
				},
			},
		);
	};

	return (
		<div className="stretch mx-auto flex w-full max-w-md flex-col gap-4 py-24">
			{messages.map((m) => (
				<div key={m.id} className="w-full whitespace-pre-wrap break-keep">
					{m.role === "user" ? (
						<div className="flex min-h-8 w-full justify-end">
							<p className="flex w-[70%] items-center bg-black/30 text-cyan-400 text-stroke-green">
								<span className="leading-2">{`🍀 User: ${m.content}`}</span>
							</p>
						</div>
					) : (
						<p className="flex w-full text-left text-neutral-200 text-stroke">{`🧚 AI: ${m.content}`}</p>
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
					onChange={handleInputChange}
				/>
			</form>
		</div>
	);
}

export default ChatTemplate;
