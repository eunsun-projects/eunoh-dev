import { z } from "zod";

export const ImageAnalysisSchema = z.object({
	is_person: z.boolean(),
	desc: z.string(),
	age: z.number().int().nonnegative(),
});

export const GiftRecommendationSchema = z.object({
	product_name: z.string(),
	reason: z.string(),
	humor: z.string(),
});

export type ImageAnalysisResult = z.infer<typeof ImageAnalysisSchema>;
export type GiftRecommendationResult = z.infer<typeof GiftRecommendationSchema>;
