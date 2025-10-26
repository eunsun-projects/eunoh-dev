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
		const imageStream = await openai.responses.create({
			model: model || "gpt-4o-mini",
			input: [
				{
					role: "user",
					content: [
						{
							type: "input_text",
							text: `Edit the following image based on this prompt: "${prompt}"`,
						},
						{
							type: "input_image",
							image_url: `data:image/webp;base64,${base64}`,
							detail: "auto",
						},
					],
				},
			],
			stream: true,
			tools: [
				{
					type: "image_generation",
					partial_images: 3,
					size: "1024x1024",
					quality: "medium",
				},
			],
		});

		const encoder = new TextEncoder();

		const readableStream = new ReadableStream({
			async start(controller) {
				for await (const event of imageStream) {
					let outputIndex = 0;
					if (event.type === "response.image_generation_call.partial_image") {
						const imageBase64 = event.partial_image_b64;
						outputIndex = event.partial_image_index;
						const responseObject = {
							output_index: event.partial_image_index,
							partial_image_b64s: [imageBase64],
							usage: null,
							status: "partial",
							final_model: null,
						};
						controller.enqueue(
							encoder.encode(`${JSON.stringify(responseObject)}\n`),
						);
					} else if (
						event.type === "response.image_generation_call.completed"
					) {
						// do nothing
					} else if (event.type === "response.completed") {
						// console.log("event.response ===>", event.response);
						const completedObj = event.response.output.find(
							(item) => item.type === "image_generation_call",
						);
						// console.log("completedObj ===>", completedObj);
						const imageBase64 = completedObj ? completedObj.result : null;
						const responseObject = {
							output_index: outputIndex + 1,
							partial_image_b64s: imageBase64 ? [imageBase64] : [],
							usage: event.response.usage || null,
							status: "completed",
							final_model: event.response.model,
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
			cancel() {
				console.log("Stream cancelled by client.");
			},
		});

		return new Response(readableStream, {
			headers: {
				"Content-Type": "application/jsonl; charset=utf-8",
				"X-Content-Type-Options": "nosniff",
				"Cache-Control": "no-cache",
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
