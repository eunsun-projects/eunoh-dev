import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { prefetchProjects } from "@/lib/prefetch";
import { createStaticClient } from "@/utils/supabase/static";
import ProjectsListTemplate from "./_components/ProjectsListTemplate";

export const dynamic = "force-static";

async function ProjectsPage() {
	const queryClient = new QueryClient();
	const supabase = createStaticClient();

	await prefetchProjects(supabase, queryClient);

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<ProjectsListTemplate />
		</HydrationBoundary>
	);
}

export default ProjectsPage;
