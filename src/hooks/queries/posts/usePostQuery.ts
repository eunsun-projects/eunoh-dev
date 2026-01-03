import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/apis/apis-posts";
import { QUERY_KEY_POSTS } from "@/constants/query.constants";

export function usePostsQuery() {
	return useQuery({
		queryKey: [QUERY_KEY_POSTS],
		queryFn: getPosts,
	});
}
