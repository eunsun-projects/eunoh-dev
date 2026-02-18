import { after } from "next/server";
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
	updateIffyFailed,
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

	// Phase 1: 이미지 변환 + AI 분석 + 선물 추천 + 원본 업로드 (병렬)
	const analysisResult = await runAnalysisPhase(imageFile, giftData, supabase);
	if (analysisResult instanceof NextResponse) {
		return analysisResult;
	}

	// Phase 2: DB 저장 → 즉시 응답 → 이미지 생성은 백그라운드
	const userId = await getCurrentUserId(supabase);
	const iffyRecord = buildIffyRecord(analysisResult, userId);

	try {
		await insertIffy(supabase, iffyRecord);
	} catch {
		return NextResponse.json(
			{ error: "데이터베이스 저장 중 오류가 발생했습니다." },
			{ status: 500 },
		);
	}

	if (analysisResult.isError) {
		return NextResponse.json(iffyRecord);
	}

	// Phase 3: 이미지 생성을 응답 후 백그라운드에서 실행
	after(async () => {
		try {
			const base64Image = await generateStylizedImage(
				analysisResult.pngBuffer,
				analysisResult.stylePrompt,
			);
			const stylizedUrl = await uploadStylizedImage(supabase, base64Image);
			await updateIffyImageCompleted(supabase, analysisResult.id, stylizedUrl);
		} catch (error) {
			console.error("백그라운드 이미지 생성 실패:", error);
			await updateIffyFailed(
				supabase,
				analysisResult.id,
				"이미지 생성에 실패했습니다. 다시 시도해주세요.",
			).catch((e) => console.error("상태 업데이트 실패:", e));
		}
	});

	return NextResponse.json(iffyRecord);
}

// ─── Phase 1: 분석 및 추천 (병렬 처리) ─────────────────────────────

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

	// AI 분석과 원본 업로드를 병렬 실행 (서로 독립적)
	const [analysisSettled, uploadSettled] = await Promise.allSettled([
		analyzeImage(imageBuffer),
		uploadOriginalImage(supabase, pngBuffer),
	]);

	// 업로드 결과: 실패해도 폴백 URL 사용
	const imageUrl =
		uploadSettled.status === "fulfilled"
			? uploadSettled.value
			: FALLBACK_IMAGE_URL;

	if (uploadSettled.status === "rejected") {
		console.error("원본 이미지 업로드 실패, 폴백 URL 사용:", uploadSettled.reason);
	}

	// 분석 결과: 실패 시 전체 폴백
	if (analysisSettled.status === "rejected") {
		const message =
			analysisSettled.reason instanceof Error
				? analysisSettled.reason.message
				: "알 수 없는 오류";

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

	const { is_person: isPerson, desc, age } = analysisSettled.value;

	// 선물 추천 (분석 결과에 의존)
	let gift: GiftResult;
	try {
		gift = isPerson
			? await resolveGiftForPerson(giftData, desc, age)
			: selectGiftForNonPerson(giftData);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "알 수 없는 오류";
		return {
			id: crypto.randomUUID(),
			isPerson,
			age,
			desc,
			stylePrompt: "",
			imageUrl,
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
			errorReason: `선물 추천 중 오류: ${message}`,
		};
	}

	const stylePrompt = buildStylePrompt(isPerson, age, desc);

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

// ─── Helpers ─────────────────────────────────────────────────────────

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
