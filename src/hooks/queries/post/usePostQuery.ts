import { getPost } from "@/apis/post";
import { QUERY_KEY_POSTS } from "@/constants/query.constants";
import { useQuery } from "@tanstack/react-query";

export function usePostQuery(engTitle: string) {
  return useQuery({
    queryKey: [QUERY_KEY_POSTS, engTitle],
    queryFn: () => getPost(engTitle),
  });
}
