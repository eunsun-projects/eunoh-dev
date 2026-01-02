# Fourplay Spec (v0.1)

## 0. 목표
- 사용자가 어려운 결정을 할 때, 3개 모델이 “턴 단위”로 의견을 내고, 마지막에 GPT가 종합한다.
- 단일 요청에서 4회 응답을 끝내지 않는다. (사용자 검토 + 다음 모델 선택/변경)
- 응답은 스트리밍으로 자연스럽게 표시된다. (useChat 기반)
- 모델 응답은 JSON 강제(정형 스키마) + raw_text 저장(디버깅/복구).
- 코드블럭 포함 가능. UI는 typography/ReactMarkdown으로 렌더링.

## 0-1. 접근 제어 (Authentication / Authorization)
- Fourplay는 로그인 사용자만 접근 가능
- 현재 MVP 단계에서는 "특정 사용자 1명(본인)"만 사용 가능
- 인증 정보는 클라이언트에서 `useAuth()` 훅을 통해 획득
  - const { user } = useAuth();
- 서버/API 레벨에서도 user 검증을 반드시 수행한다
  (클라이언트 검증은 UX용, 서버 검증이 최종)

### 허용 조건
- user !== null
- user.isAdmin === true

### 거부 시 UX
- 비로그인: 로그인 유도 UI
- 로그인했지만 admin 아님:
  - "Private experiment" 안내 메시지
  - API 호출 차단

## 1. UX 플로우
### 1-1. 기본 시나리오
1) 사용자 질문 입력 (Create Thread + Turn#1 user)
2) 모델 1 (기본: openai/gpt-5.2) 스트리밍 응답 (Turn#2 assistant)
3) UI: 버튼 2개
   - "계속(제안대로)" -> next_model로 진행
   - "계속(모델지정)" -> select로 모델 선택 후 진행
4) 모델 2 스트리밍 응답 (Turn#3 assistant)
5) 동일한 방식으로 모델 3 (Turn#4 assistant)
6) 사용자가 "summary 진행" 선택 시 GPT가 최종 종합 (Turn#5 assistant, kind=final_summary)
7) Thread.status = completed + threads.final_decision 저장

### 1-2. 중간 종료/스킵(선택)
- "종료(현재 결론 채택)" -> thread.completed + final_decision에 현재까지 요약 저장
- "스킵(다음 모델로)" -> 중간 모델 턴을 건너뛰고 다음 턴 생성

## 2. 데이터 모델 (Supabase)
- fourplay_threads: 대화(세션/스레드) 단위
- fourplay_turns: 메시지/턴 단위 (user/assistant/tool/system)
- turns.payload(JSONB): 강제 JSON 결과물 저장
- turns.raw_text(TEXT): 마크다운 원문(코드블럭 포함)
- turns.next_model 추천은 UI에서 자주 쓰므로 컬럼으로 보관
- 최종 종합은 threads.final_decision(JSONB)에 저장

## 3. DB SQL (파일로 관리)
- /app/(public)/fourplay/_db/001_init.sql (RLS, 인덱스 포함)

### 환경변수
- `AI_GATEWAY_API_KEY`: Vercel AI Gateway API 키 (모든 모델 호출에 사용)

## 4. 서버 API
### 4-1. Next.js Route Handlers (App Router)
- POST /api/fourplay/threads
  - body: { title?: string, firstMessage: string }
  - returns: { threadId }
- GET /api/fourplay/threads/:id
  - returns: thread + turns
- POST /api/fourplay/turns
  - body: { threadId, model, kind, userSelection, inputMessage, contextSummary }
  - creates user turn(optional) + assistant turn streaming
  - returns: SSE/stream response (useChat endpoint로 통합 가능)

### 4-2. useChat 엔드포인트(권장)
- POST /api/fourplay/chat
  - body: { threadId, mode: "model"|"summary", selectedModel?, userAction, userMessage? }
  - 내부에서:
    - turn 생성(유저 메시지/모델 메시지)
    - AI SDK 6로 스트리밍
    - 스트림 종료 후, payload(raw_text 포함) DB 업데이트

## 5. AI 오케스트레이션 규칙
### 5-1. 모델 목록 (id는 UI/DB에 저장될 값)
- openai:openai/gpt-5.2
- openai:openai/gpt-5-chat
- google:google/gemini-3-pro-preview
- google:google/gemini-3-flash
- anthropic:anthropic/claude-sonnet-4.5
- anthropic:anthropic/claude-opus-4.5

### 5-2. 역할(턴 kind)
- opener: 첫 모델 (기본 openai/gpt-5.2)
- mid: 두 번째/세 번째 모델
- final_summary: 마지막 GPT 종합 (openai/gpt-5.2)

### 5-3. 강제 JSON 스키마 (payload)
모든 assistant 턴은 아래 JSON을 “문자 그대로” 출력한다.
- 파싱 실패 시: 1회 재요청(“유효 JSON만”) -> 그래도 실패 시 raw_text만 저장 + payload는 최소 구조로.

AssistantPayload:
- conclusion: string (1~3줄)
- reasons: string[] (3~6)
- risks: string[] (0~4)
- counterpoints: string[] (0~4)
- questions: string[] (0~4)   // 사용자에게 확인할 질문(있으면)
- nextModel: string           // 위 모델 id 중 하나
- nextModelReason: string     // 1~2줄
- handoffContext: string      // 다음 모델에게 줄 핵심 요약(짧게)
- markdown: string            // 사용자에게 보여줄 마크다운(코드블럭 포함 가능)

FinalSummaryPayload(threads.final_decision에도 저장):
- decision: string
- rationale: string[]
- checklist: string[]
- monitoring: string[]
- nextQuestions: string[]

## 6. 프론트엔드 구조 (폴더)
- /app/(public)/fourplay/page.tsx
- /app/(public)/fourplay/_components
  - ChatShell.tsx
  - MessageList.tsx
  - MessageItem.tsx
  - TurnActions.tsx (계속/모델지정/select)
  - ModelSelect.tsx
  - ThreadHeader.tsx
- /app/(public)/fourplay/_hooks
  - /queries (react-query)
  - /mutations (react-query)
- /app/(public)/fourplay/_apis
  - api-client.ts (axios 패턴)
- /app/(public)/fourplay/_libs
  - fourplay-models.ts (모델 enum/label)
  - fourplay-schema.ts (zod schemas: payload)
  - fourplay-prompts.ts (system prompt 템플릿)
- /app/(public)/fourplay/_db
  - 001_init.sql (RLS, 인덱스 포함)

## 7. 마크다운 렌더링
- assistant.payload.markdown을 UI에 표시
- ReactMarkdown + remarkGfm 사용
- typography(prose) 적용
- 코드블럭은 fence 유지 (```)

## 8. 구현 순서(추천)
1) DB SQL 실행 + gen types
2) API: threads CRUD + turns insert/read
3) /api/fourplay/chat 스트리밍 구현(useChat)
4) UI: thread 로드 + message list + 스트리밍 표시
5) 버튼/모델선택 + 다음 턴 진행
6) JSON 파싱/재요청/복구 로직
7) 최종 summary 저장 + status completed