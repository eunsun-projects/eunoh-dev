import { cache } from "react";
import axios from "@/lib/axios";
import type { PartialProject, Project } from "@/types/project.types";
import { createStaticClient } from "@/utils/supabase/static";

interface GetProjectParams {
	engTitle: string;
}

export async function getProject({ engTitle }: GetProjectParams) {
	return axios.get<Project>(`/api/project?engTitle=${engTitle}`);
}

export async function getProjects() {
	return axios.get<Project[]>("/api/projects");
}

export async function postProject(formData: FormData) {
	return axios.post<PartialProject>("/api/projects", formData);
}

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
