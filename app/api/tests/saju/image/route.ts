import { NextResponse } from "next/server";
import OpenAI from "openai";

const OPEN_AI_SECRET_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
	const { name } = await req.json();

	try {
		const openai = new OpenAI({
			apiKey: OPEN_AI_SECRET_KEY,
		});

		const imageGeneration = await openai.images.generate({
			model: "dall-e-3",
			prompt: `
    ${name}님의 번영을 상징하는 전통 동양 부적 이미지.
    부적의 중앙에는 귀여운 일본풍 애니메이션 캐릭터가 등장하고,
    주변에 전통 무늬가 장식되어 있습니다.
  `,
			n: 1,
			quality: "hd",
			style: "natural",
			response_format: "url",
		});

		const imageUrl = imageGeneration.data?.[0]?.url;

		if (!imageUrl) {
			return NextResponse.json({ error: "Missing image URL" }, { status: 400 });
		}

		return NextResponse.json({ imageUrl }, { status: 200 });

		// const response = await fetch(imageUrl);
		// if (!response.ok) {
		//   return NextResponse.json({ error: 'Failed to fetch image' }, { status: response.status });
		// }

		// // 1) ArrayBuffer로 읽기
		// const arrayBuffer = await response.arrayBuffer();

		// // 2) Base64로 변환
		// const base64Image = Buffer.from(arrayBuffer).toString('base64');

		// // 3) JSON으로 반환
		// return NextResponse.json(
		//   {
		//     imageUrl: `data:image/png;base64,${base64Image}`,
		//   },
		//   { status: 200 },
		// );
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to generate image" },
			{ status: 500 },
		);
	}
}
