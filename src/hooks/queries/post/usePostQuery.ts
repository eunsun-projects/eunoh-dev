import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/apis/apis-posts";
import { QUERY_KEY_POSTS } from "@/constants/query.constants";

interface UsePostQueryProps {
	engTitle?: string;
	id?: string;
}

export function usePostQuery({ engTitle, id }: UsePostQueryProps) {
	return useQuery({
		queryKey: [QUERY_KEY_POSTS, engTitle, id],
		queryFn: () => getPost({ engTitle, id }),
	});
}
