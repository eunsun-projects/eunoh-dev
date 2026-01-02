import { openai } from "@ai-sdk/openai";
import {
	convertToModelMessages,
	type LanguageModelUsage,
	streamText,
	type UIMessage,
} from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Create a new metadata type (optional for type-safety)
type MyMetadata = {
	totalUsage: LanguageModelUsage;
};
export type MyUIMessage = UIMessage<MyMetadata>;

export async function POST(req: Request) {
	const { messages, model }: { messages: MyUIMessage[]; model?: string } =
		await req.json();

	const modelInstance = openai(model || "gpt-4o-mini");

	const result = streamText({
		model: modelInstance,
		messages: await convertToModelMessages(messages),
		// onStepFinish: (step) => {
		// 	// usage 정보는 자동으로 finish 이벤트에 포함됨
		// 	console.log("Step finished with usage:", step.usage);
		// },
	});

	return result.toUIMessageStreamResponse({
		originalMessages: messages,
		messageMetadata: ({ part }) => {
			// Send total usage when generation is finished
			if (part.type === "finish") {
				return { totalUsage: part.totalUsage };
			}
		},
	});
}
