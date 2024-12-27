import { getPost } from '@/apis/post';
import { getPosts } from '@/apis/posts';
import Loading from '@/app/loading';
import NotFound from '@/app/not-found';
import { QUERY_KEY_POSTS } from '@/constants/query.constants';
import { Post } from '@/types/post.types';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import PublicPostTemplate from '../_components/PublicPostTemplate';
interface PublicPostPageProps {
  params: Promise<{ engTitle: string }>;
}

async function PublicPostPage({ params }: PublicPostPageProps) {
  const engTitle = (await params).engTitle;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_POSTS],
    queryFn: () => getPosts(),
  });

  const posts = await queryClient.getQueryData<Post[]>([QUERY_KEY_POSTS]);
  const post = posts?.find((post) => post.engTitle === engTitle);

  if (!post) {
    return <NotFound />;
  }

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_POSTS, post.id],
    queryFn: () => getPost(post.id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydratedState}>
        <PublicPostTemplate id={post.id} />
      </HydrationBoundary>
    </Suspense>
  );
}

export default PublicPostPage;
