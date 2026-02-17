import { openai } from "@ai-sdk/openai";
import { generateImage, generateText, Output, type RetryError } from "ai";
import type { GiftData } from "@/app/(public)/tests/amaechild/_types/types";
import {
	type GiftRecommendationResult,
	GiftRecommendationSchema,
	type ImageAnalysisResult,
	ImageAnalysisSchema,
} from "./schemas";

export async function analyzeImage(
	imageBuffer: Buffer,
): Promise<ImageAnalysisResult> {
	try {
		const { output } = await generateText({
			model: "openai/gpt-5-nano",
			output: Output.object({ schema: ImageAnalysisSchema }),
			messages: [
				{
					role: "user",
					content: [
						{
							type: "text",
							text: `이 사진을 보고 다음 정보를 JSON 형식으로 알려줘: is_person (true/false), desc (대상의 묘사), age (예상 나이 숫자). 예시: {"is_person": true, "desc": "귀여운 아이", "age": 6}`,
						},
						{ type: "image", image: imageBuffer },
					],
				},
			],
		});
		return output;
	} catch (error) {
		if ((error as RetryError).reason === "maxRetriesExceeded") {
			throw new Error("AI 최대 사용량을 초과했어요. 나중에 다시 시도해주세요.");
		}
		throw new Error("이미지 분석 오류가 발생했어요. 다시 시도해볼까요?");
	}
}

export async function recommendGift(
	candidates: GiftData[],
	desc: string,
	age: number,
): Promise<GiftRecommendationResult> {
	const giftOptions = candidates
		.map(
			(g, idx) =>
				`${idx + 1}. 브랜드: ${g.brand}, 제품 명: ${g.name}, 설명: ${g.description}`,
		)
		.join("\n");

	const prompt = buildRecommendationPrompt(giftOptions, desc, age);

	const { output } = await generateText({
		model: "openai/gpt-5-nano",
		output: Output.object({ schema: GiftRecommendationSchema }),
		system: "너는 센스 있는 선물 추천 AI야. 형식에 꼭 맞게 대답해야 해.",
		prompt,
	});

	return output;
}

export async function generateStylizedImage(
	pngBuffer: Buffer,
	stylePrompt: string,
): Promise<string> {
	const { image } = await generateImage({
		model: openai.image("gpt-image-1"),
		prompt: { images: [pngBuffer], text: stylePrompt },
		n: 1,
		size: "1024x1024",
	});

	return image.base64;
}

export function buildStylePrompt(
	isPerson: boolean,
	age: number,
	desc: string,
): string {
	if (isPerson) {
		return `make this person look like a cute cartoon character who is ${age} years old, with a soft and playful illustration style`;
	}
	return `make the subject described as '${desc}' look like a cute cartoon character, with a soft and playful illustration style`;
}

function buildRecommendationPrompt(
	giftOptions: string,
	desc: string,
	age: number,
): string {
	return `애매한이날은 어린이날 맞춤 이벤트로 어린이인지를 판단하여 재치있는 답변을 해주는 프로젝트입니다. 어린이의 기준은 20세까지입니다. 어린이가 아니라도 선물은 추천해야 합니다. 다음은 애매한이날 선물 후보 목록입니다:

${giftOptions}

이미지 분석 결과 대상은 '${desc}'(으)로 묘사됩니다.
나이는 약 ${age}세입니다.
가장 잘 어울리는 LG전자 제품 선물을 하나 골라주세요. 특히, 이미지 분석 결과인 '${desc}'(으)로 묘사되고 약 ${age}세로 추정되는 대상에게 가장 적합하다고 생각되는 선물을, 선물 후보의 설명을 바탕으로 신중하게 골라주세요.
고른 선물과 관련해서 어린이날 선물을 받아도 되는지 판독하는 듯한 유머러스한 메시지를 유머 필드에 한 문장으로 짧고 재치있게 만들어주세요. 꼭 다음의 예제가 아니어도 됩니다.(ex. 무럭무럭 자랄 나이예요. 아직 말도 다 못하지만, 공기는 맑아야죠? LG 퓨리케어, 첫 선물로 딱이에요 / 초딩이지만 눈은 4K만 찾는 당신! LG 스탠바이미 Go로 동화도 보고 유튜브도 보고, 다 되네? / 감정 기복은 심하지만, 영상은 부드러워야죠. LG QNED TV, 중2병도 감동할 화질! / 수능도 시험도 중요한데, 속도가 느리면 열받잖아요? LG 그램, 가볍고 빠르게 미래로 가자 / 출근은 지옥인데, 스타일은 포기 못 해. 오늘도 깔끔한 옷엔 LG 스타일러 한 방이면 끝! / 이젠 내가 선물을 받기보단 챙겨주는 나이… 하지만 LG 트롬 건조기는 나를 위한 최소한의 효도지 / 나이 들수록 건강이 중요해요. 힐링미 안마의자로 피로를 풀어보세요 / 그간의 노고 수고하셨습니다! 오늘의 피로를 오브제 안마의자로 풀어보세요)
그리고 추천 이유도 어린이날 선물이라는 것을 연관지어 추천이유 필드에 작성해주세요.
❗ 반드시 'product_name'은 후보 목록에 있는 이름을 정확하게 복사해서 써야 해요.

응답은 반드시 아래 JSON 형식으로 해주세요:
{
  "product_name": "후보 목록에 있는 제품 명 중 하나",
  "reason": "...",
  "humor": "..."
}`;
}
