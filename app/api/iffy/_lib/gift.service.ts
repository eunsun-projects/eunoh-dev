import type { GiftData } from "@/app/(public)/tests/amaechild/_types/types";
import type { GiftRecommendationResult } from "./schemas";

const FALLBACK_GIFT_NAME = "LG QNED TV";
const FALLBACK_BRAND = "LG";
const FALLBACK_HUMOR = "잘 모르겠을때는 TV가 최고!";

export interface GiftResult {
	giftName: string;
	brand: string;
	giftLink: string;
	reason: string;
	humor: string;
	productImgUrl: string;
	needsAiRecommendation: false;
}

export interface GiftCandidates {
	candidates: GiftData[];
	ageGroup: string;
	needsAiRecommendation: true;
}

export type GiftSelectionResult = GiftResult | GiftCandidates;

export function determineAgeGroup(age: number): string {
	if (age <= 20) return "0-20";
	if (age <= 40) return "21-40";
	if (age <= 60) return "41-60";
	if (age <= 80) return "61-";
	return "기타";
}

export function selectGiftForNonPerson(giftData: GiftData[]): GiftResult {
	const fallback = findFallbackGift(giftData);
	return {
		giftName: fallback.name,
		brand: fallback.brand || FALLBACK_BRAND,
		giftLink: fallback.product_link || "",
		reason:
			"도대체 무슨 사진을 올린거에요? 그냥 기본 LG제품(QNED TV)을 추천해드릴게요.",
		humor: FALLBACK_HUMOR,
		productImgUrl: fallback.product_img || "",
		needsAiRecommendation: false,
	};
}

export function selectGiftForPerson(
	giftData: GiftData[],
	age: number,
): GiftSelectionResult {
	const ageGroup = determineAgeGroup(age);
	const candidates = giftData.filter((g) => g.age_group === ageGroup);

	if (candidates.length === 0) {
		const fallback = findFallbackGift(giftData);
		return {
			giftName: fallback.name,
			brand: fallback.brand || FALLBACK_BRAND,
			giftLink: fallback.product_link || "",
			reason: `AI도 ${ageGroup} 나이대 선물을 고르기 어려웠나봐요! 대신 기본 LG제품(QNED TV)을 추천해요.`,
			humor: FALLBACK_HUMOR,
			productImgUrl: fallback.product_img || "",
			needsAiRecommendation: false,
		};
	}

	return { candidates, ageGroup, needsAiRecommendation: true };
}

export function resolveAiRecommendation(
	recommendation: GiftRecommendationResult,
	candidates: GiftData[],
	giftData: GiftData[],
	ageGroup: string,
): GiftResult {
	const trimmedName = recommendation.product_name.trim();
	const matched = candidates.find((g) => g.name?.trim() === trimmedName);

	if (matched) {
		return {
			giftName: matched.name,
			brand: matched.brand || "",
			giftLink: matched.product_link || "",
			reason: recommendation.reason,
			humor: recommendation.humor,
			productImgUrl: matched.product_img || "",
			needsAiRecommendation: false,
		};
	}

	console.error(
		`GPT 이름 '${trimmedName}'이(가) 후보 목록(${ageGroup})에 없습니다.`,
		candidates.map((c) => c.name),
	);

	const fallbackGift = giftData.find((g) => g.name === FALLBACK_GIFT_NAME);
	if (fallbackGift) {
		return {
			giftName: fallbackGift.name,
			brand: fallbackGift.brand || FALLBACK_BRAND,
			giftLink: fallbackGift.product_link || "",
			reason:
				"AI가 길을 잃었나봐요! 그래도 선물은 있죠! LG QNED TV를 추천해드릴게요.",
			humor: FALLBACK_HUMOR,
			productImgUrl: fallbackGift.product_img || "",
			needsAiRecommendation: false,
		};
	}

	const firstCandidate = candidates[0];
	if (firstCandidate) {
		return {
			giftName: firstCandidate.name,
			brand: firstCandidate.brand || "",
			giftLink: firstCandidate.product_link || "",
			reason: "AI 추천을 찾지 못해 다른 선물을 골랐어요. 이것도 좋아할 거예요!",
			humor: FALLBACK_HUMOR,
			productImgUrl: firstCandidate.product_img || "",
			needsAiRecommendation: false,
		};
	}

	throw new Error("추천할 수 있는 선물을 찾지 못했습니다.");
}

function findFallbackGift(giftData: GiftData[]): GiftData {
	const fallback = giftData.find((g) => g.name === FALLBACK_GIFT_NAME);
	if (!fallback) {
		throw new Error(
			`'${FALLBACK_GIFT_NAME}' 항목을 데이터에서 찾을 수 없습니다.`,
		);
	}
	return fallback;
}
