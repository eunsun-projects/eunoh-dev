import { getPost } from "@/apis/post";
import Loading from "@/app/loading";
import { QUERY_KEY_POSTS } from "@/constants/query.constants";
import type { Post } from "@/types/post.types";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PublicPostTemplate from "../_components/PublicPostTemplate";

interface PublicPostPageProps {
  params: Promise<{ engTitle: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = true; // 🔥 새 프로젝트 자동 처리

async function PublicPostPage({ params }: PublicPostPageProps) {
  const engTitle = (await params).engTitle;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_POSTS, engTitle],
    queryFn: () => getPost({ engTitle }),
  });

  const post = queryClient.getQueryData<Post>([QUERY_KEY_POSTS, engTitle]);

  if (!post) notFound();

  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydratedState}>
        <PublicPostTemplate post={post} />
      </HydrationBoundary>
    </Suspense>
  );
}

export default PublicPostPage;
