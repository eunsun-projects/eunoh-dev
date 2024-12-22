import { postPost } from '@/apis/posts';
import { QUERY_KEY_POSTS } from '@/constants/query.constants';
import { PartialPost } from '@/types/post.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function usePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PartialPost) => postPost(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_POSTS] });
    },
  });
}
