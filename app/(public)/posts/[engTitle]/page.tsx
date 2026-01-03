import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { QUERY_KEY_POSTS } from "@/constants/query.constants";
import { getPost, getPosts } from "@/lib/crud";
import { isUUID } from "@/utils/common/isUUID";
import { createStaticClient } from "@/utils/supabase/static";
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
	const supabase = createStaticClient();
	const posts = await getPosts(supabase);

	if (!posts) return [];

	return posts.map((post) => ({
		engTitle: post.engTitle,
	}));
}

async function PublicPostPage({ params }: PublicPostPageProps) {
	const engTitle = (await params).engTitle;

	const queryClient = new QueryClient();
	const supabase = createStaticClient();
	const isUuid = isUUID(engTitle);

	const post = await getPost(supabase, engTitle, isUuid);

	if (!post) notFound();

	queryClient.setQueryData([QUERY_KEY_POSTS, engTitle], post);

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<PublicPostTemplate post={post} />
		</HydrationBoundary>
	);
}

export default PublicPostPage;
