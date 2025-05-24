import { getProjects } from "@/apis/projects";
import Loading from "@/app/loading";
import { QUERY_KEY_PROJECTS } from "@/constants/query.constants";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import ProjectsListTemplate from "./_components/ProjectsListTemplate";

async function ProjectsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_PROJECTS],
    queryFn: () => getProjects(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydratedState}>
        <ProjectsListTemplate />
      </HydrationBoundary>
    </Suspense>
  );
}

export default ProjectsPage;
