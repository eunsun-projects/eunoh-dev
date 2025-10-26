import type { Project } from "@/types/project.types";
import fetchWrapper from "@/utils/common/fetchWrapper";

export async function getProjects() {
	const url = "/api/projects";
	const response = await fetchWrapper<Project[]>(url, {
		method: "GET",
	});
	return response;
}
