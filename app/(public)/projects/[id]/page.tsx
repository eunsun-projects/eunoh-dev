import { getProjects } from "@/apis/projects";
import Loading from "@/app/loading";
import { QUERY_KEY_PROJECTS } from "@/constants/query.constants";
import type { Project, ProjectWithImages } from "@/types/project.types";
import getImageSizeServer from "@/utils/image/getImageSizeServer";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import ProjectTemplate from "../_components/ProjectTemplate";

async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_PROJECTS],
    queryFn: () => getProjects(),
  });

  const dehydratedState = dehydrate(queryClient);

  const projects = (await queryClient.getQueryData<Project[]>([
    QUERY_KEY_PROJECTS,
  ])) as Project[];

  const promises = projects.map(async (project) => {
    const sizes = await Promise.all(
      project.images?.map(getImageSizeServer) ?? [],
    );
    const newImages =
      project.images?.map((image, i) => ({
        image,
        width: sizes[i]?.width ?? 0,
        height: sizes[i]?.height ?? 0,
      })) ?? [];
    return {
      ...project,
      newImages,
    };
  });
  const projectPromises = await Promise.all(promises);
  const filteredProjects = projectPromises.filter((project) => project.isView);
  const project = filteredProjects.find(
    (project) => project.id === id,
  ) as ProjectWithImages;

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydratedState}>
        <ProjectTemplate project={project} />
      </HydrationBoundary>
    </Suspense>
  );
}

export default ProjectPage;
