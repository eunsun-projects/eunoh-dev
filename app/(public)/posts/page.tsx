import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { prefetchPosts } from "@/lib/prefetch";
import { createStaticClient } from "@/utils/supabase/static";
import PublicPostsListTemplate from "./_components/PublicPostsListTemplate";

export const dynamic = "force-static";

async function PostsPage() {
	const queryClient = new QueryClient();
	const supabase = createStaticClient();

	await prefetchPosts(supabase, queryClient);

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<PublicPostsListTemplate />
		</HydrationBoundary>
	);
}

export default PostsPage;
