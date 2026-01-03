import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPost } from "@/apis/apis-posts";
import { QUERY_KEY_POSTS } from "@/constants/query.constants";
import type { PartialPost } from "@/types/post.types";

export function usePostMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: PartialPost) => postPost(body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEY_POSTS] });
		},
	});
}
