import { type NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const OPEN_AI_SECRET_KEY = process.env.OPENAI_API_KEY;
// Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

export async function POST(req: NextRequest) {
	try {
		const { name, birth } = await req.json();

		const openai = new OpenAI({
			apiKey: OPEN_AI_SECRET_KEY,
		});

		// Define both chat completion and image generation requests
		const chatCompletion = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{ role: "system", content: "당신은 점술가입니다." },
				{
					role: "user",
					content: `이름: ${name} 생년월일: ${birth} 이 사람의 사주와 2025년 운세, 권고사항, 번영을 위한 조언을 JSON 형식으로 반환하고, JSON의 키는 사주해석, 운세, 권고사항, 번영을 위한 조언으로 해주세요. 각 키의 하위에는 또다른 키가 없어야 합니다. 각 키의 값은 문자열이어야 합니다.`,
				},
			],
		});

		// 코드 블록 제거 후 파싱
		const chatResult = chatCompletion.choices[0].message.content;
		const jsonString = chatResult?.replace(/```json|```/g, "").trim();
		const parsedData = jsonString ? JSON.parse(jsonString) : null;

		return NextResponse.json({ message: parsedData }, { status: 200 });
		// const { name, birth } = JSON.parse(messages[0].content);

		// const result = streamText({
		//   model: openai('gpt-4o-mini'),
		//   system: '당신은 점술가입니다.',
		//   prompt: `이름: ${name} 생년월일: ${birth} 이 사람의 사주와 2025년 운세, 권고사항, 번영을 위한 조언을 알려주세요. 응답은 사주(interpretation), 운세(fortune), 권고사항(recommendations), 번영을 위한 조언(prosperity_advice) 4항목 으로 해주세요.`,
		// });

		// return result.toDataStreamResponse();
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to generate image" },
			{ status: 500 },
		);
	}
}
