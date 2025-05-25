"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";

function ChatTemplate() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onFinish: (message, options) => {
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
      }
    );
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch gap-4">
      {messages.map((m) => (
        <div key={m.id} className="w-full whitespace-pre-wrap break-keep">
          {m.role === "user" ? (
            <div className="flex w-full justify-end min-h-8">
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
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 bg-neutral-300 border border-neutral-300 shadow-xl focus:outline-none focus-visible:outline-none"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

export default ChatTemplate;
