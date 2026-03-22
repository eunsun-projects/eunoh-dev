import { readFileSync } from "node:fs";
import path from "node:path";
import { openai } from "@ai-sdk/openai";
import { generateImage } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { summarizeSseErrorText } from "./_lib/summarize-for-log";

const MODEL_ID = "gpt-image-1.5";

/**
 * 마스크·출력 size와 동일한 한 변 길이.
 * OpenAI는 마스크를 출력 해상도가 아니라 "편집 대상 입력 이미지"(여기서는 첫 번째 이미지)와 픽셀 단위로 맞춥니다.
 */
const CANVAS_EDGE = 1024;

/**
 * 부분 이미지 스트리밍은 OpenAI Responses API(`openai.responses.create` + `stream`)에서만 안정적으로 다룰 수 있음.
 * `@ai-sdk/openai`의 `generateImage`는 이미지 편집/생성 결과를 한 번에 받는 흐름에 맞춰져 있음.
 */

const ASSETS_DIR = path.join(process.cwd(), "public", "assets", "animate");

const REFERENCE_ASSETS = {
	mask: readFileSync(path.join(ASSETS_DIR, "overlay.webp")),
	ref1: readFileSync(path.join(ASSETS_DIR, "reference_1.webp")),
	ref2: readFileSync(path.join(ASSETS_DIR, "reference_2.webp")),
} as const;

export async function POST(request: NextRequest) {
	const formData = await request.formData();
	const file = formData.get("file");

	if (!(file instanceof File)) {
		return NextResponse.json({ error: "File is required" }, { status: 400 });
	}

	const uploadRaw = new Uint8Array(await file.arrayBuffer());

	let upload: Uint8Array;
	try {
		upload = await normalizeUploadToMaskCanvas(uploadRaw, CANVAS_EDGE);
	} catch {
		return NextResponse.json(
			{ error: "Invalid or unsupported image file" },
			{ status: 400 },
		);
	}

	try {
		const { image, warnings, images, responses, providerMetadata, usage } =
			await generateImage({
				model: openai.image(MODEL_ID),
				prompt: buildImagePrompt(upload, REFERENCE_ASSETS),
				size: `${CANVAS_EDGE}x${CANVAS_EDGE}`,
			});

		// console.log(
		// 	"[animate] generateImage summary\n",
		// 	JSON.stringify(
		// 		summarizeForLog({
		// 			image,
		// 			images,
		// 			warnings,
		// 			responses,
		// 			providerMetadata,
		// 			usage,
		// 		}),
		// 		null,
		// 		2,
		// 	),
		// );

		return NextResponse.json(
			{
				status: "success" as const,
				mediaType: image.mediaType,
				imageBase64: image.base64,
			},
			{ status: 200 },
		);
	} catch (error) {
		logGenerateImageFailure(error);
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error occurred";
		return NextResponse.json(
			{ error: "Failed to generate image", details: errorMessage },
			{ status: 500 },
		);
	}
}

function logGenerateImageFailure(error: unknown) {
	console.error("Error generating image:", error);
	for (const e of collectErrorChain(error)) {
		if (e && typeof e === "object" && "text" in e) {
			const t = (e as { text: unknown }).text;
			if (typeof t === "string") {
				console.error(
					"[animate] error.text (summarized, e.g. SSE blocks)\n",
					JSON.stringify(summarizeSseErrorText(t), null, 2),
				);
			}
		}
	}
}

function collectErrorChain(error: unknown): unknown[] {
	const out: unknown[] = [error];
	if (error instanceof Error && error.cause !== undefined) {
		out.push(error.cause);
	}
	return out;
}

function buildImagePrompt(upload: Uint8Array, refs: typeof REFERENCE_ASSETS) {
	return {
		images: [upload, refs.ref1, refs.ref2],
		text: PROMPT,
		mask: refs.mask,
	};
}

/** 마스크(고정 캔버스)와 동일 크기의 정사각 입력을 만든다. EXIF 회전 반영. */
async function normalizeUploadToMaskCanvas(
	input: Uint8Array,
	edge: number,
): Promise<Uint8Array> {
	const out = await sharp(Buffer.from(input))
		.rotate()
		.resize(edge, edge, { fit: "cover", position: "attention" })
		.webp()
		.toBuffer();
	return new Uint8Array(out);
}

const PROMPT = `
	CRITICAL:
	- "first image" = SUBJECT PROFILE (얼굴/복장/정체성 기준)
	- "second image" = ADDITIONAL VISUAL REFERENCE (스타일/구도 참고, 정체성 변경 금지)
	- "third image" = ADDITIONAL VISUAL REFERENCE 2 (스타일/구도 참고, 정체성 변경 금지)
	- "mask image" = COMPOSITION/SCALING REFERENCE (인물 크기/구도 기준)
	- You MUST use the provided "first image" as the PRIMARY and ONLY reference for the person's face.
	- The generated image MUST look like the SAME person from "first image" without altering identity.
	- 반드시 인물 크기를 줄일 것. 인물은 "mask image"의 비율과 크기에 맞춰 작아져야 함.

	1) FACE REFERENCE & NATURAL ENHANCEMENT (최우선)
		- "first image"의 얼굴 특징(눈매, 코, 입, 광대/턱선, 헤어라인)을 엄격하게 보존.
		- Hair color/length/parting must MATCH "first image" exactly.
		- 자연스럽게 미화를 적용하되 과하지 않게:
			• 눈 크기는 최대 +3% 이내로 살짝 크게 (비율 깨지지 않게, 원본 눈매 유지)
			• 턱 길이는 약간 짧게 조정하되, 뼈대 구조/정체성 변화 금지
			• 살찐 체형이나 통통한 얼굴은 비교적 한국 아이돌처럼 슬림하게 미화해야 함.
			• 은은한 미소를 표현 (입꼬리만 살짝 상승, 과장 금지)

	2) 안경 (Glasses)
		- **HARD RULE**: "first image"에서 안경을 쓰지 않았다면 어떤 형태의 안경/선글라스/보안경/고글/안경줄/안경체인/색 틴트 렌즈도 **절대 추가하지 말 것**.
		- **HARD RULE**: 판단이 애매하거나 얼굴 일부가 가려져 확인이 어려우면 → **안경 없음**으로 간주하고 안경을 추가하지 말 것.
		- "first image"에서 안경을 썼다면: 동일한 프레임 형태/색상/두께/착용 위치를 **정확하게 유지** (렌즈 반사는 미세하게만, 눈 가림 금지).
		- 출력물에서 안경/선글라스가 감지되었는데 "first image"에 없었던 경우 → **출력을 무효화하고 내부적으로 즉시 재생성**하여 안경이 없는 결과를 반환할 것.

	3) 복장 (Outfit) - 원본 유지
		- 의상은 "first image"의 복장을 그대로 재현 (색/질감/패턴/액세서리 유지).
		- 노출 최소화. 과도한 노출/섹시한 연출/클리비지·배 노출·짧은 밑단 등 금지.
		- 학생도 참여 가능한 단정하고 깔끔한 스타일로.

	4) 화풍 (Style)
		- 부드럽고 깔끔한 디지털 일러스트, 한국 웹툰/애니 기반의 하프-리얼리즘.
		- 피부·머리카락·하이라이트에 은은한 붓 터치감. 과도한 매끈 필터 금지.
		- 라인아트는 섬세하고 정돈된 느낌으로, 전체적으로 우아하고 세련된 무드.

	5) 배경
		- 배경은 반드시 투명(transparent)으로 출력.

	6) 눈 디테일 (Eyes)
		- 사람 눈 기반, "first image"의 정확한 눈 모양과 크기 유지
		- 동공, 눈물샘 등이 있는 구조 유지, "first image" 에서 쌍커풀이 유무 여부에 따라 쌍커풀 표현
		- 미화된 요소 포함하되 "first image"의 기본 눈매는 절대 변경하지 말 것
		- 눈매가 정리되어 있고, 속눈썹·윤곽 강조, "first image" 의 속눈썹이 길다면, 길이를 느낄 수 있을 만큼 표현할 것
		- 살짝 과장된 크기와 감정 표현 (단, "first image"의 기본 눈 특징 유지)
		- 눈망울이 크고, 초점이 뚜렷하며, 눈동자가 선명함
		- 빛 표현 강조
		- 반사광이 여러 개 들어간 듯한 눈, 깊이 있는 광택

	7) 자세·구도 (Pose & Composition)
		- 반드시 팔짱을 낀 포즈(arms crossed pose)로 고정.
		- 팔짱은 자연스럽고 단정한 자세로, 어색하거나 과도하게 과장된 연출은 피함.
		- 가능하면 "first image"와 유사한 머리 각도·시선·구도를 유지.
		- 한국 아이돌 홍보 포스터처럼 단정하고 자신감 있는 분위기.
		- 과장된 표정/드라마틱한 명암/극단적 카메라 심도효과는 피함.

	8) 색상·광원·컬러 밸런스
		- 뉴트럴~쿨 톤, 파스텔 계열. 밝고 깨끗한 채광, 명암 과하지 않게.
		- 출력물의 누런끼(엘로우 캐스트)를 최소화하고 화이트 밸런스를 정확히 맞출 것.
		- 피부톤은 건강하고 자연스럽게, 주황/노랑 과포화 금지.

	9) 금지 항목 (Do/Don't)
		- 포토리얼 기준의 피부모공/과도한 페이셜 쉐이딩/입체효과 금지.
		- 노출 유도 연출·성적 맥락·극단적 보정·과장된 눈 크기 금지.

	10) FINAL CHECK
		- 인물 크기: "mask image" 기준으로 축소되어야 함.
		- 안경 착용 시: 프레임/렌즈 정확히 재현, 눈 시인성 확보.
		- 안경 조건: 원본에 있을 때만 유지. 원본에 없으면 어떤 형태의 안경/선글라스도 추가 금지(애매하면 미착용으로 처리).
		- 복장: 원본 사진과 동일하게, 노출 최소화 확인.
		- 자세: 반드시 팔짱을 낀 포즈(arms crossed pose)로 고정.
		- 누런끼 최소화 및 전반적 색 균형 확인.
		- 안경 규칙 최종 확인: "first image"에서 안경이 **없다면** 결과물에 어떤 형태의 안경/선글라스도 존재하면 **무효**. 즉시 **재생성**하여 안경 없는 결과만 반환.
		- 판단 애매 시: 안경 없음으로 처리. 추가 금지.
`;
