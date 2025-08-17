import { getPost } from "@/apis/post";
import { QUERY_KEY_POSTS } from "@/constants/query.constants";
import { useQuery } from "@tanstack/react-query";

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
