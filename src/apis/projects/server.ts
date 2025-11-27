import { cache } from "react";
import type { Project } from "@/types/project.types";
import { createStaticClient } from "@/utils/supabase/static";

/**
 * 서버 컴포넌트에서 직접 DB 접근하여 단일 프로젝트 조회
 * API 라우트를 거치지 않아 정적 생성에 적합
 */
export const getProjectServer = cache(
	async (engTitle: string): Promise<Project | null> => {
		const supabase = createStaticClient();

		const { data, error } = await supabase
			.from("projects")
			.select("*")
			.eq("isView", true)
			.eq("engTitle", engTitle)
			.single();

		if (error) {
			console.error("Error fetching project:", error.message);
			return null;
		}

		return data as Project;
	},
);

/**
 * 서버 컴포넌트에서 직접 DB 접근하여 모든 프로젝트 목록 조회
 * generateStaticParams에서 사용
 */
export const getProjectsServer = cache(async (): Promise<Project[]> => {
	const supabase = createStaticClient();

	const { data, error } = await supabase
		.from("projects")
		.select("*")
		.eq("isView", true)
		.order("number", { ascending: true });

	if (error) {
		console.error("Error fetching projects:", error.message);
		return [];
	}

	return (data as Project[]) ?? [];
});
