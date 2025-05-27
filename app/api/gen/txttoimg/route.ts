import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  throw new Error("Missing environment variable OPENAI_API_KEY");
}

const openai = new OpenAI({ apiKey: openaiApiKey });

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("prompt");
  const model = searchParams.get("model");

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    const imageStream = await openai.responses.create({
      model: model || "gpt-4o-mini",
      input: prompt,
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
          if (event.type === "response.image_generation_call.partial_image") {
            const imageBase64 = event.partial_image_b64;
            const responseObject = {
              output_index: event.partial_image_index,
              partial_image_b64s: [imageBase64],
              usage: null,
            };
            controller.enqueue(
              encoder.encode(`${JSON.stringify(responseObject)}\n`)
            );
          } else if (
            event.type === "response.image_generation_call.completed"
          ) {
            // do nothing
          } else if (event.type === "response.completed") {
            const completedObj = event.response.output.find(
              (item) => item.type === "image_generation_call"
            );
            // console.log("completedObj ===>", completedObj);
            const imageBase64 = completedObj ? completedObj.result : null;
            const responseObject = {
              output_index: 4, // 위에서 3단계로 나눴고 0부터 시작하므로 마지막 단계는 4번 인덱스
              partial_image_b64s: imageBase64 ? [imageBase64] : [],
              usage: event.response.usage || null,
            };
            controller.enqueue(
              encoder.encode(`${JSON.stringify(responseObject)}\n`)
            );
          } else if (event.type === "error") {
            console.error("OpenAI Stream Error Code:", (event as any).code);
            console.error(
              "OpenAI Stream Error Message:",
              (event as any).message
            );
            console.error("OpenAI Stream Error Param:", (event as any).param);
            const errorObject = {
              error: true,
              message: (event as any).message || "OpenAI stream error",
              code: (event as any).code,
              param: (event as any).param,
            };
            controller.enqueue(
              encoder.encode(`${JSON.stringify(errorObject)}\n`)
            );
            controller.error(
              new Error((event as any).message || "OpenAI stream error")
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
      { status: 500 }
    );
  }
}
