import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	deleteTimeCapsule,
	editTimeCapsule,
	getTimeCapsules,
	postTimeCapsule,
} from "@/apis/tests/api.tests";
import { QUERY_KEY_TIME_CAPSULES } from "@/constants/query.constants";
import type { TimeCapsule, TimeCapsuleFromSupabase } from "@/types/tests.type";

export function useTimeCapsulesQuery() {
	return useQuery<TimeCapsuleFromSupabase[]>({
		queryKey: [QUERY_KEY_TIME_CAPSULES],
		queryFn: getTimeCapsules,
	});
}

export function useTimeCapsulesMutation() {
	const queryClient = useQueryClient();
	return useMutation<TimeCapsule, Error, Partial<TimeCapsule>>({
		mutationFn: (timeCapsule) => postTimeCapsule(timeCapsule),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEY_TIME_CAPSULES] });
		},
	});
}

export function useEditTimeCapsulesMutation() {
	const queryClient = useQueryClient();
	return useMutation<TimeCapsule, Error, Partial<TimeCapsule>>({
		mutationFn: (timeCapsule) => editTimeCapsule(timeCapsule),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEY_TIME_CAPSULES] });
		},
	});
}

export function useDeleteTimeCapsulesMutation() {
	const queryClient = useQueryClient();
	return useMutation<TimeCapsule, Error, Partial<TimeCapsule>>({
		mutationFn: (timeCapsule) => deleteTimeCapsule(timeCapsule),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEY_TIME_CAPSULES] });
		},
	});
}
