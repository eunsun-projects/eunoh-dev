import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { getProjectsServer } from "@/apis/apis-projects";
import { QUERY_KEY_PROJECTS } from "@/constants/query.constants";
import { getProject } from "@/lib/crud";
import { processProjectImages } from "@/utils/image/processProjectImages";
import { createStaticClient } from "@/utils/supabase/static";
import ProjectTemplate from "../_components/ProjectTemplate";

interface ProjectPageProps {
	params: Promise<{ engTitle: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = true; // 🔥 새 프로젝트 자동 처리

/**
 * 빌드 시점에 모든 프로젝트 페이지를 미리 생성
 */
export async function generateStaticParams() {
	const projects = await getProjectsServer();

	return projects.map((project) => ({
		engTitle: project.engTitle,
	}));
}

async function ProjectPage({ params }: ProjectPageProps) {
	const engTitle = (await params).engTitle;
	const queryClient = new QueryClient();
	const supabase = createStaticClient();

	const project = await getProject(supabase, engTitle);

	if (!project) notFound();

	const processedProject = await processProjectImages(project);

	queryClient.setQueryData([QUERY_KEY_PROJECTS, engTitle], processedProject);

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<ProjectTemplate project={processedProject} />
		</HydrationBoundary>
	);
}

export default ProjectPage;
