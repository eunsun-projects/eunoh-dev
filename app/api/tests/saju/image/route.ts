import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const OPEN_AI_SECRET_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
  const { name } = await req.json();

  try {
    const openai = new OpenAI({
      apiKey: OPEN_AI_SECRET_KEY,
    });

    const imageGeneration = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `
    ${name}님의 번영을 상징하는 전통 동양 부적 이미지.
    부적의 중앙에는 귀여운 일본풍 애니메이션 캐릭터가 등장하고,
    주변에 전통 무늬가 장식되어 있습니다.
  `,
      n: 1,
      quality: 'hd',
      style: 'natural',
      response_format: 'url',
    });

    const imageUrl = imageGeneration.data[0].url;

    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
