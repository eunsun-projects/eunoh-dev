// Fourplay 모델 설정
// Vercel AI Gateway 사용 - process.env.AI_GATEWAY_API_KEY

export type FourplayModelId =
	| "openai/gpt-5.2"
	| "openai/gpt-5-chat"
	| "google/gemini-3-pro-preview"
	| "google/gemini-3-flash"
	| "anthropic/claude-sonnet-4.5"
	| "anthropic/claude-opus-4.5";

export type FourplayProvider = "openai" | "google" | "anthropic";

export interface FourplayModel {
	id: FourplayModelId;
	provider: FourplayProvider;
	label: string;
	description: string;
}

export const FOURPLAY_MODELS: Record<FourplayModelId, FourplayModel> = {
	"openai/gpt-5.2": {
		id: "openai/gpt-5.2",
		provider: "openai",
		label: "GPT-5.2",
		description: "OpenAI의 최신 추론 모델",
	},
	"openai/gpt-5-chat": {
		id: "openai/gpt-5-chat",
		provider: "openai",
		label: "GPT-5 Chat",
		description: "OpenAI의 대화형 모델",
	},
	"google/gemini-3-pro-preview": {
		id: "google/gemini-3-pro-preview",
		provider: "google",
		label: "Gemini 3 Pro",
		description: "Google의 고성능 추론 모델",
	},
	"google/gemini-3-flash": {
		id: "google/gemini-3-flash",
		provider: "google",
		label: "Gemini 3 Flash",
		description: "Google의 빠른 응답 모델",
	},
	"anthropic/claude-sonnet-4.5": {
		id: "anthropic/claude-sonnet-4.5",
		provider: "anthropic",
		label: "Claude Sonnet 4.5",
		description: "Anthropic의 균형잡힌 모델",
	},
	"anthropic/claude-opus-4.5": {
		id: "anthropic/claude-opus-4.5",
		provider: "anthropic",
		label: "Claude Opus 4.5",
		description: "Anthropic의 최고 성능 모델",
	},
};

export const DEFAULT_MODEL: FourplayModelId = "openai/gpt-5.2";
export const SUMMARY_MODEL: FourplayModelId = "openai/gpt-5.2";

export const MODEL_LIST = Object.values(FOURPLAY_MODELS);

export function getModelById(id: string): FourplayModel | undefined {
	return FOURPLAY_MODELS[id as FourplayModelId];
}

export function getProviderFromModelId(modelId: string): FourplayProvider {
	const [provider] = modelId.split("/");
	return provider as FourplayProvider;
}
