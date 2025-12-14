import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { getPosts } from "@/apis/posts";
import { QUERY_KEY_POSTS } from "@/constants/query.constants";
import PublicPostsListTemplate from "./_components/PublicPostsListTemplate";

export const dynamic = "force-static";

async function PostsPage() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: [QUERY_KEY_POSTS],
		queryFn: () => getPosts(),
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<PublicPostsListTemplate />
		</HydrationBoundary>
	);
}

export default PostsPage;
