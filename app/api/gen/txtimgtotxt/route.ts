import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
	throw new Error("Missing environment variable OPENAI_API_KEY");
}

const openai = new OpenAI({ apiKey: openaiApiKey });

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const { searchParams } = new URL(req.url);
	const prompt = searchParams.get("prompt");
	const model = searchParams.get("model");
	const file = formData.get("file") as File;

	if (!file || !prompt) {
		return new Response("Missing file or prompt", { status: 400 });
	}

	const arrayBuffer = await file.arrayBuffer();
	const base64 = Buffer.from(arrayBuffer).toString("base64");

	try {
		const stream = await openai.responses.create({
			model: model || "gpt-4o-mini",
			stream: true,
			input: [
				{
					role: "user",
					content: [
						{ type: "input_text", text: prompt },
						{
							type: "input_image",
							image_url: `data:image/webp;base64,${base64}`,
							detail: "auto",
						},
					],
				},
			],
		});

		const encoder = new TextEncoder();

		const readable = new ReadableStream({
			async start(controller) {
				let accumulated = "";
				for await (const event of stream) {
					if (event.type === "response.output_text.delta") {
						const delta = event.delta;
						if (delta) {
							accumulated += delta;
							const responseObject = {
								text: delta,
								status: "partial",
								final_model: null,
								usage: null,
							};
							controller.enqueue(
								encoder.encode(`${JSON.stringify(responseObject)}\n`),
							);
						}
					} else if (event.type === "response.output_text.done") {
						// do nothing
					} else if (event.type === "response.completed") {
						// console.log("event.response ===>", event.response);
						const responseObject = {
							text: accumulated,
							status: "completed",
							final_model: event.response.model,
							usage: event.response.usage,
						};
						controller.enqueue(
							encoder.encode(`${JSON.stringify(responseObject)}\n`),
						);
					} else if (event.type === "error") {
						console.error("OpenAI Stream Error Code:", (event as any).code);
						console.error(
							"OpenAI Stream Error Message:",
							(event as any).message,
						);
						console.error("OpenAI Stream Error Param:", (event as any).param);
						const errorObject = {
							error: true,
							message: (event as any).message || "OpenAI stream error",
							code: (event as any).code,
							param: (event as any).param,
						};
						controller.enqueue(
							encoder.encode(`${JSON.stringify(errorObject)}\n`),
						);
						controller.error(
							new Error((event as any).message || "OpenAI stream error"),
						);
						return;
					}
				}
				controller.close();
			},
		});

		return new Response(readable, {
			headers: {
				"Content-Type": "application/jsonl; charset=utf-8",
				"Cache-Control": "no-cache",
				"X-Content-Type-Options": "nosniff",
			},
		});
	} catch (error) {
		console.error("Error generating image stream:", error);
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error occurred";
		return NextResponse.json(
			{ error: "Failed to generate image stream", details: errorMessage },
			{ status: 500 },
		);
	}
}
