import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
	const { messages, model } = await req.json();

	const modelInstance = openai(model);

	const result = streamText({
		model: modelInstance,
		messages,
	});

	return result.toDataStreamResponse();
}
