import { getPosts } from '@/apis/posts';
import { QUERY_KEY_POSTS } from '@/constants/query.constants';
import { useQuery } from '@tanstack/react-query';

export function usePostsQuery() {
  return useQuery({
    queryKey: [QUERY_KEY_POSTS],
    queryFn: getPosts,
  });
}
