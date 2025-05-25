import { getProjects } from "@/apis/projects";
import { QUERY_KEY_PROJECTS } from "@/constants/query.constants";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ProjectsListTemplate from "./_components/ProjectsListTemplate";

async function ProjectsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_PROJECTS],
    queryFn: () => getProjects(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    // <Suspense fallback={<Loading />}>
    <HydrationBoundary state={dehydratedState}>
      <ProjectsListTemplate />
    </HydrationBoundary>
    // </Suspense>
  );
}

export default ProjectsPage;
