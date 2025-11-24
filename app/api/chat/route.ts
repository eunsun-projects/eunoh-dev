import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
	const { messages } = await req.json();

	const modelInstance = openai("gpt-4o-mini");

	const result = streamText({
		model: modelInstance,
		messages: convertToModelMessages(messages),
	});

	return result.toUIMessageStreamResponse();
}
