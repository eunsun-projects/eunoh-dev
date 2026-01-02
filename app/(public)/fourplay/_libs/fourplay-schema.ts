import { z } from "zod";

// Assistant 턴의 JSON 페이로드 스키마
export const assistantPayloadSchema = z.object({
	conclusion: z.string().describe("핵심 결론 (1~3줄)"),
	reasons: z
		.array(z.string())
		.min(3)
		.max(6)
		.describe("결론을 뒷받침하는 이유들"),
	risks: z
		.array(z.string())
		.max(4)
		.describe("고려해야 할 리스크/단점")
		.default([]),
	counterpoints: z
		.array(z.string())
		.max(4)
		.describe("반대 의견이나 대안")
		.default([]),
	questions: z
		.array(z.string())
		.max(4)
		.describe("사용자에게 확인할 질문")
		.default([]),
	nextModel: z.string().describe("다음 턴에 추천하는 모델 ID"),
	nextModelReason: z.string().describe("해당 모델을 추천하는 이유 (1~2줄)"),
	handoffContext: z.string().describe("다음 모델에게 전달할 핵심 요약"),
	markdown: z.string().describe("사용자에게 보여줄 전체 마크다운 (코드블럭 포함 가능)"),
});

export type AssistantPayload = z.infer<typeof assistantPayloadSchema>;

// 최종 요약 페이로드 스키마
export const finalSummaryPayloadSchema = z.object({
	decision: z.string().describe("최종 결정/권고사항"),
	rationale: z.array(z.string()).describe("결정의 근거들"),
	checklist: z.array(z.string()).describe("실행 체크리스트"),
	monitoring: z.array(z.string()).describe("모니터링/주의사항"),
	nextQuestions: z
		.array(z.string())
		.describe("추가로 고려할 질문들")
		.default([]),
});

export type FinalSummaryPayload = z.infer<typeof finalSummaryPayloadSchema>;

// Chat API 요청 스키마
export const chatRequestSchema = z.object({
	threadId: z.string().uuid(),
	mode: z.enum(["model", "summary"]),
	selectedModel: z.string().optional(),
	userAction: z.enum(["continue", "continue_with_model", "summary", "skip"]),
	userMessage: z.string().optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

// 최소 페이로드 (파싱 실패 시 사용)
export const minimalPayloadSchema = z.object({
	conclusion: z.string().default("응답을 처리하는 중 오류가 발생했습니다."),
	reasons: z.array(z.string()).default([]),
	risks: z.array(z.string()).default([]),
	counterpoints: z.array(z.string()).default([]),
	questions: z.array(z.string()).default([]),
	nextModel: z.string().default("openai/gpt-5.2"),
	nextModelReason: z.string().default(""),
	handoffContext: z.string().default(""),
	markdown: z.string().default(""),
});
