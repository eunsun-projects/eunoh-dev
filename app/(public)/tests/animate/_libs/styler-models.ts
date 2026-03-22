// Styler 모델 설정
// Vercel AI Gateway 사용 - process.env.AI_GATEWAY_API_KEY

export type AnimateModelId = "openai/gpt-image-1" | "google/gemini-3-pro-image";

export type AnimateProvider = "openai" | "google";

export interface AnimateModel {
	id: AnimateModelId;
	provider: AnimateProvider;
	label: string;
	description: string;
}

export const ANIMATE_MODELS: Record<AnimateModelId, AnimateModel> = {
	"openai/gpt-image-1": {
		id: "openai/gpt-image-1",
		provider: "openai",
		label: "GPT-Image-1",
		description: "OpenAI의 이미지 생성 모델",
	},
	"google/gemini-3-pro-image": {
		id: "google/gemini-3-pro-image",
		provider: "google",
		label: "Gemini 3 Pro Image",
		description: "Google의 이미지 생성 모델",
	},
};

export const DEFAULT_MODEL: AnimateModelId = "openai/gpt-image-1";

export const MODEL_LIST = Object.values(ANIMATE_MODELS);

export function getModelById(id: string): AnimateModel | undefined {
	return ANIMATE_MODELS[id as AnimateModelId];
}

export function getProviderFromModelId(modelId: string): AnimateProvider {
	const [provider] = modelId.split("/");
	return provider as AnimateProvider;
}
