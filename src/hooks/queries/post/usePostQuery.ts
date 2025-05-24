import { getPost } from "@/apis/post";
import { QUERY_KEY_POSTS } from "@/constants/query.constants";
import { useQuery } from "@tanstack/react-query";

export function usePostQuery(id: string) {
  return useQuery({
    queryKey: [QUERY_KEY_POSTS, id],
    queryFn: () => getPost(id),
  });
}
