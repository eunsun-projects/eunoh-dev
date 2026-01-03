"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	type CreateThreadRequest,
	createThread,
	createTurn,
	getThreads,
	getThreadWithTurns,
	type Thread,
	type ThreadWithTurns,
	type Turn,
	updateThread,
} from "../_apis/fourplay-api";

// Query Keys
export const fourplayKeys = {
	all: ["fourplay"] as const,
	threads: () => [...fourplayKeys.all, "threads"] as const,
	thread: (id: string) => [...fourplayKeys.all, "thread", id] as const,
	turns: (threadId: string) =>
		[...fourplayKeys.all, "turns", threadId] as const,
};

// Threads 목록 조회
export function useThreadsQuery() {
	return useQuery<Thread[]>({
		queryKey: fourplayKeys.threads(),
		queryFn: getThreads,
	});
}

// Thread + Turns 조회
export function useThreadQuery(threadId: string | null) {
	return useQuery<ThreadWithTurns>({
		queryKey: fourplayKeys.thread(threadId || ""),
		queryFn: () => getThreadWithTurns(threadId!),
		enabled: !!threadId,
	});
}

// Thread 생성
export function useCreateThread() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateThreadRequest) => createThread(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: fourplayKeys.threads() });
		},
	});
}

// Thread 상태 업데이트
export function useUpdateThread() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			threadId,
			data,
		}: {
			threadId: string;
			data: { status?: string; final_decision?: Record<string, unknown> };
		}) => updateThread(threadId, data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: fourplayKeys.thread(variables.threadId),
			});
			queryClient.invalidateQueries({ queryKey: fourplayKeys.threads() });
		},
	});
}

// Turn 생성 (non-streaming)
export function useCreateTurn() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: {
			threadId: string;
			role: "user" | "assistant" | "system" | "tool";
			kind?: string;
			model?: string;
			selectedBy?: "auto" | "user";
			nextModel?: string;
			nextModelReason?: string;
			payload?: Record<string, unknown>;
			rawText?: string;
		}) => createTurn(data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: fourplayKeys.thread(variables.threadId),
			});
		},
	});
}

// Thread 데이터 수동 업데이트 (optimistic update용)
export function useInvalidateThread() {
	const queryClient = useQueryClient();

	return (threadId: string) => {
		return queryClient.invalidateQueries({
			queryKey: fourplayKeys.thread(threadId),
		});
	};
}

// Turn을 로컬 캐시에 추가 (스트리밍 중 사용)
export function useAddTurnToCache() {
	const queryClient = useQueryClient();

	return (threadId: string, turn: Turn) => {
		queryClient.setQueryData<ThreadWithTurns>(
			fourplayKeys.thread(threadId),
			(old) => {
				if (!old) return old;
				return {
					...old,
					turns: [...old.turns, turn],
				};
			},
		);
	};
}

// Turn 업데이트 (스트리밍 완료 후 사용)
export function useUpdateTurnInCache() {
	const queryClient = useQueryClient();

	return (threadId: string, turnId: string, updates: Partial<Turn>) => {
		queryClient.setQueryData<ThreadWithTurns>(
			fourplayKeys.thread(threadId),
			(old) => {
				if (!old) return old;
				return {
					...old,
					turns: old.turns.map((t) =>
						t.id === turnId ? { ...t, ...updates } : t,
					),
				};
			},
		);
	};
}
