import { postSajuImageTest } from '@/apis/tests/api.tests';
import { SajuImageTestResponse } from '@/types/tests.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSajuImageMutation() {
  const queryClient = useQueryClient();
  return useMutation<SajuImageTestResponse, Error, { name: string }>({
    mutationFn: (data) => postSajuImageTest(data),
    // onSuccess: (newTrip) => {
    //   queryClient.invalidateQueries({
    //     queryKey: [QUERY_KEY_TRIP, newTrip.trip_id],
    //   });
    // },
  });
}
