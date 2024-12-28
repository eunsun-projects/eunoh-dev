import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const OPEN_AI_SECRET_KEY = process.env.OPEN_AI_SECRET_KEY;

export async function POST(req: Request) {
  const { name, birth } = await req.json();

  const openai = new OpenAI({
    apiKey: OPEN_AI_SECRET_KEY,
  });

  // Define both chat completion and image generation requests
  const chatCompletion = openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: '당신은 점술가입니다.' },
      {
        role: 'user',
        content: `이름: ${name} 생년월일: ${birth} 이 사람의 사주와 2025년 운세를 알려주세요. 결과를 JSON 형식으로 반환하고, 자세한 권고사항과 번영을 위한 조언도 포함해 주세요.`,
      },
    ],
  });

  const imageGeneration = openai.images.generate({
    model: 'dall-e-3',
    prompt: `
    ${name}님의 번영을 상징하는 전통 동양 부적 이미지.
    부적의 중앙에는 귀여운 일본풍 애니메이션 캐릭터가 등장하고,
    주변에 전통 무늬가 장식되어 있습니다.
  `,
    n: 1,
  });

  // Process both requests in parallel
  const [completion, image] = await Promise.all([chatCompletion, imageGeneration]);

  const chatResult = completion.choices[0].message.content;
  const imageUrl = image.data[0].url;

  // Combine results and send response
  return NextResponse.json(
    {
      message: chatResult,
      imageUrl,
    },
    { status: 200 },
  );
}
