import { type NextRequest, NextResponse } from "next/server";
import giftJson from "@/app/(public)/tests/amaechild/_data/data.json";
import type {
	GiftData,
	Iffy,
} from "@/app/(public)/tests/amaechild/_types/types";
import { createClient } from "@/utils/supabase/server";
import {
	analyzeImage,
	buildStylePrompt,
	generateStylizedImage,
	recommendGift,
} from "./_lib/ai.service";
import type { GiftResult } from "./_lib/gift.service";
import {
	resolveAiRecommendation,
	selectGiftForNonPerson,
	selectGiftForPerson,
} from "./_lib/gift.service";
import {
	getCurrentUserId,
	getIffyById,
	getIffyCount,
	insertIffy,
	updateIffyImageCompleted,
} from "./_lib/iffy.repository";
import {
	convertToPngBuffer,
	uploadOriginalImage,
	uploadStylizedImage,
} from "./_lib/image.service";

const FALLBACK_IMAGE_URL =
	"https://urtfszkmtgmcqrnchihz.supabase.co/storage/v1/object/public/images/iffy/fallback_image.webp";

// ─── GET ─────────────────────────────────────────────────────────────
export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");
	const supabase = await createClient();

	try {
		if (!id) {
			const count = await getIffyCount(supabase);
			return NextResponse.json({ resultCount: count }, { status: 200 });
		}

		const data = await getIffyById(supabase, id);
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		const message = error instanceof Error ? error.message : "알 수 없는 오류";
		return NextResponse.json({ error: message }, { status: 500 });
	}
}

// ─── POST ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
	const giftData: GiftData[] = giftJson;
	const formData = await request.formData();
	const imageFile = formData.get("image") as File | null;

	if (!imageFile) {
		return NextResponse.json(
			{ error: "이미지 파일이 필요합니다." },
			{ status: 400 },
		);
	}

	const supabase = await createClient();

	// 1단계: 이미지 변환 + AI 분석 + 선물 추천 + 원본 업로드
	const analysisPhaseResult = await runAnalysisPhase(
		imageFile,
		giftData,
		supabase,
	);
	if (analysisPhaseResult instanceof NextResponse) {
		return analysisPhaseResult;
	}

	// 2단계: DB 저장 + 이미지 생성 + 최종 업데이트
	return runGenerationPhase(analysisPhaseResult, supabase);
}

// ─── Phase 1: 분석 및 추천 ──────────────────────────────────────────

interface AnalysisPhaseData {
	id: string;
	isPerson: boolean;
	age: number;
	desc: string;
	stylePrompt: string;
	imageUrl: string;
	pngBuffer: Buffer;
	gift: GiftResult;
	isError: boolean;
	errorReason?: string;
}

async function runAnalysisPhase(
	imageFile: File,
	giftData: GiftData[],
	supabase: Awaited<ReturnType<typeof createClient>>,
): Promise<AnalysisPhaseData | NextResponse> {
	const { imageBuffer, pngBuffer } = await convertToPngBuffer(imageFile);

	// Step 1: AI 분석 + 선물 추천 (실패 시 전체 폴백)
	let isPerson = false;
	let age = 0;
	let desc = "분석 실패";
	let gift: GiftResult;

	try {
		const analysis = await analyzeImage(imageBuffer);
		isPerson = analysis.is_person;
		desc = analysis.desc;
		age = analysis.age;

		gift = isPerson
			? await resolveGiftForPerson(giftData, desc, age)
			: selectGiftForNonPerson(giftData);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "알 수 없는 오류";

		if (message.includes("AI 최대 사용량을 초과했어요")) {
			return NextResponse.json({ error: message }, { status: 500 });
		}

		return {
			id: crypto.randomUUID(),
			isPerson: false,
			age: 0,
			desc: "분석 실패",
			stylePrompt: "",
			imageUrl: FALLBACK_IMAGE_URL,
			pngBuffer,
			gift: {
				giftName: "🤖",
				brand: "",
				giftLink: "",
				reason: "문제가 발생했어요. 다시 시도해볼까요?",
				humor: "사진이 너무 귀여워서 AI가 심쿵했어요… 추천은 잠시 쉬어갈게요!",
				productImgUrl: "",
				needsAiRecommendation: false,
			},
			isError: true,
			errorReason: `초기 처리 중 오류: ${message}`,
		};
	}

	// Step 2: 원본 이미지 업로드 (실패해도 분석 결과 보존)
	const stylePrompt = buildStylePrompt(isPerson, age, desc);
	let imageUrl: string;

	try {
		imageUrl = await uploadOriginalImage(supabase, pngBuffer);
	} catch (error) {
		console.error("원본 이미지 업로드 실패, 폴백 URL 사용:", error);
		imageUrl = FALLBACK_IMAGE_URL;
	}

	return {
		id: crypto.randomUUID(),
		isPerson,
		age,
		desc,
		stylePrompt,
		imageUrl,
		pngBuffer,
		gift,
		isError: false,
	};
}

async function resolveGiftForPerson(
	giftData: GiftData[],
	desc: string,
	age: number,
): Promise<GiftResult> {
	const selection = selectGiftForPerson(giftData, age);

	if (!selection.needsAiRecommendation) {
		return selection;
	}

	const recommendation = await recommendGift(selection.candidates, desc, age);
	return resolveAiRecommendation(
		recommendation,
		selection.candidates,
		giftData,
		selection.ageGroup,
	);
}

// ─── Phase 2: DB 저장 및 이미지 생성 ────────────────────────────────

async function runGenerationPhase(
	data: AnalysisPhaseData,
	supabase: Awaited<ReturnType<typeof createClient>>,
): Promise<NextResponse> {
	const { id } = data;

	try {
		const userId = await getCurrentUserId(supabase);
		const iffyRecord = buildIffyRecord(data, userId);
		await insertIffy(supabase, iffyRecord);

		if (data.isError) {
			return NextResponse.json(iffyRecord);
		}

		const base64Image = await generateStylizedImage(
			data.pngBuffer,
			data.stylePrompt,
		);
		const stylizedImageUrl = await uploadStylizedImage(supabase, base64Image);
		const updatedIffy = await updateIffyImageCompleted(
			supabase,
			id,
			stylizedImageUrl,
		);

		return NextResponse.json(updatedIffy);
	} catch (error) {
		const message = error instanceof Error ? error.message : "알 수 없는 오류";
		console.error("최종 처리 중 오류:", message);

		return NextResponse.json(
			{
				is_error: true,
				commentary: `최종 처리 중 오류: ${message}`,
				status: "failed",
				updated_at: new Date().toISOString(),
			} satisfies Partial<Iffy>,
			{ status: 500 },
		);
	}
}

function buildIffyRecord(data: AnalysisPhaseData, userId: string | null): Iffy {
	const now = new Date().toISOString();
	return {
		id: data.id,
		age: data.age,
		is_person: data.isPerson,
		desc: data.desc,
		style_prompt: data.stylePrompt,
		is_error: data.isError,
		gift_name: data.gift.giftName,
		brand: data.gift.brand,
		gift_image_url: data.imageUrl,
		commentary: data.isError
			? (data.errorReason ?? data.gift.reason)
			: data.gift.reason,
		link: data.gift.giftLink,
		humor: data.gift.humor,
		product_img_url: data.gift.productImgUrl,
		user_id: userId,
		created_at: now,
		updated_at: now,
		status: data.isError ? "failed" : "processing",
	};
}
