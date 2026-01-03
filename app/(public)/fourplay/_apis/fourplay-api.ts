import axios from "@/lib/axios";
import type {
	ChatRequest,
	FinalSummaryPayload,
} from "../_libs/fourplay-schema";

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
	final_decision: FinalSummaryPayload | null;
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

export async function createThread(
	data: CreateThreadRequest,
): Promise<CreateThreadResponse> {
	return axios.post<CreateThreadResponse>("/api/fourplay/threads", data);
}

export async function getThreads(): Promise<Thread[]> {
	return axios.get<Thread[]>("/api/fourplay/threads");
}

export async function getThreadWithTurns(
	threadId: string,
): Promise<ThreadWithTurns> {
	return axios.get<ThreadWithTurns>(`/api/fourplay/threads/${threadId}`);
}

export async function updateThread(
	threadId: string,
	data: { status?: string; final_decision?: Record<string, unknown> },
): Promise<Thread> {
	return axios.patch<Thread>(`/api/fourplay/threads/${threadId}`, data);
}

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
	return axios.post<Turn>("/api/fourplay/turns", data);
}

export async function getTurns(threadId: string): Promise<Turn[]> {
	return axios.get<Turn[]>(`/api/fourplay/turns?threadId=${threadId}`);
}

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
