import { getPosts } from "@/apis/posts";
import { QUERY_KEY_POSTS } from "@/constants/query.constants";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import PublicPostsListTemplate from "./_components/PublicPostsListTemplate";

async function PostsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_POSTS],
    queryFn: () => getPosts(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    // <Suspense fallback={<Loading />}>
    <HydrationBoundary state={dehydratedState}>
      <PublicPostsListTemplate />
    </HydrationBoundary>
    // </Suspense>
  );
}

export default PostsPage;
