import { getProjects } from "@/apis/projects";
import Loading from "@/app/loading";
import { QUERY_KEY_PROJECTS } from "@/constants/query.constants";
import type { Project } from "@/types/project.types";
import { processProjectImages } from "@/utils/image/processProjectImages";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProjectTemplate from "../_components/ProjectTemplate";

export const dynamic = "force-static";

async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_PROJECTS],
    queryFn: () => getProjects(),
  });

  const dehydratedState = dehydrate(queryClient);

  const projects = queryClient.getQueryData<Project[]>([QUERY_KEY_PROJECTS]);

  if (!projects || projects.length === 0) notFound();

  const currentProject = projects.find(
    (project) => project.id === id && project.isView
  );

  if (!currentProject) notFound();

  const project = await processProjectImages(currentProject);

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydratedState}>
        <ProjectTemplate project={project} />
      </HydrationBoundary>
    </Suspense>
  );
}

export default ProjectPage;
