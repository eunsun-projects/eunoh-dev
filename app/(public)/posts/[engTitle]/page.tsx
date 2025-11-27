import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPostServer, getPostsServer } from "@/apis/posts";
import Loading from "@/app/loading";
import { QUERY_KEY_POSTS } from "@/constants/query.constants";
import PublicPostTemplate from "../_components/PublicPostTemplate";

interface PublicPostPageProps {
	params: Promise<{ engTitle: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = true; // 🔥 새 포스트 자동 처리

/**
 * 빌드 시점에 모든 포스트 페이지를 미리 생성
 */
export async function generateStaticParams() {
	const posts = await getPostsServer();

	return posts.map((post) => ({
		engTitle: post.engTitle,
	}));
}

async function PublicPostPage({ params }: PublicPostPageProps) {
	const engTitle = (await params).engTitle;

	const queryClient = new QueryClient();

	// API 라우트 대신 직접 DB 접근
	const post = await getPostServer(engTitle);

	if (!post) notFound();

	queryClient.setQueryData([QUERY_KEY_POSTS, engTitle], post);

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
