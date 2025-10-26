import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSajuTest } from "@/apis/tests/api.tests";
import type { SajuTestResponse } from "@/types/tests.type";

export function useSajuMutation() {
	const queryClient = useQueryClient();
	return useMutation<SajuTestResponse, Error, { name: string; birth: string }>({
		mutationFn: (data) => postSajuTest(data),
		// onSuccess: (newTrip) => {
		//   queryClient.invalidateQueries({
		//     queryKey: [QUERY_KEY_TRIP, newTrip.trip_id],
		//   });
		// },
	});
}
