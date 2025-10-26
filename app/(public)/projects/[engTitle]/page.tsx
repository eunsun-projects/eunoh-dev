import { getProject } from "@/apis/projects";
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

interface ProjectPageProps {
  params: Promise<{ engTitle: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = true; // 🔥 새 프로젝트 자동 처리

async function ProjectPage({ params }: ProjectPageProps) {
  const engTitle = (await params).engTitle;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_PROJECTS, engTitle],
    queryFn: () => getProject({ engTitle }),
  });

  const dehydratedState = dehydrate(queryClient);

  const project = queryClient.getQueryData<Project>([
    QUERY_KEY_PROJECTS,
    engTitle,
  ]);

  if (!project) notFound();

  const processedProject = await processProjectImages(project);

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydratedState}>
        <ProjectTemplate project={processedProject} />
      </HydrationBoundary>
    </Suspense>
  );
}

export default ProjectPage;
