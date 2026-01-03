import api from "@/apis/axios";
import type { ChatRequest } from "../_libs/fourplay-schema";

// Thread 관련 API
export interface CreateThreadRequest {
	title?: string;
	firstMessage: string;
}

export interface CreateThreadResponse {
	threadId: string;
}

export interface Thread {
	id: string;
	user_id: string | null;
	title: string | null;
	status: string;
	final_decision: Record<string, unknown> | null;
	created_at: string;
	updated_at: string;
}

export interface Turn {
	id: string;
	thread_id: string;
	turn_index: number;
	role: "user" | "assistant" | "system" | "tool";
	kind: string | null;
	model: string | null;
	selected_by: string | null;
	next_model: string | null;
	next_model_reason: string | null;
	payload: Record<string, unknown> | null;
	payload_raw: Record<string, unknown> | null;
	raw_text: string | null;
	latency_ms: number | null;
	token_usage: Record<string, unknown> | null;
	created_at: string;
}

export interface ThreadWithTurns {
	thread: Thread;
	turns: Turn[];
}

// Thread 생성
export async function createThread(
	data: CreateThreadRequest,
): Promise<CreateThreadResponse> {
	const response = await api.post<CreateThreadResponse>(
		"/api/fourplay/threads",
		data,
	);
	return response.data;
}

// Thread 목록 조회
export async function getThreads(): Promise<Thread[]> {
	const response = await api.get<Thread[]>("/api/fourplay/threads");
	return response.data;
}

// Thread + Turns 조회
export async function getThreadWithTurns(
	threadId: string,
): Promise<ThreadWithTurns> {
	const response = await api.get<ThreadWithTurns>(
		`/api/fourplay/threads/${threadId}`,
	);
	return response.data;
}

// Thread 상태 업데이트
export async function updateThread(
	threadId: string,
	data: { status?: string; final_decision?: Record<string, unknown> },
): Promise<Thread> {
	const response = await api.patch<Thread>(
		`/api/fourplay/threads/${threadId}`,
		data,
	);
	return response.data;
}

// Turn 생성 (non-streaming)
export async function createTurn(data: {
	threadId: string;
	role: "user" | "assistant" | "system" | "tool";
	kind?: string;
	model?: string;
	selectedBy?: "auto" | "user";
	nextModel?: string;
	nextModelReason?: string;
	payload?: Record<string, unknown>;
	rawText?: string;
}): Promise<Turn> {
	const response = await api.post<Turn>("/api/fourplay/turns", data);
	return response.data;
}

// Turns 조회
export async function getTurns(threadId: string): Promise<Turn[]> {
	const response = await api.get<Turn[]>(
		`/api/fourplay/turns?threadId=${threadId}`,
	);
	return response.data;
}

// Chat 스트리밍 요청 (fetch 사용)
export async function streamChat(
	data: ChatRequest,
): Promise<ReadableStream<Uint8Array>> {
	const response = await fetch("/api/fourplay/chat", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || "Chat streaming failed");
	}

	if (!response.body) {
		throw new Error("No response body");
	}

	return response.body;
}
