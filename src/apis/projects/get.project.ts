import type { Project } from "@/types/project.types";
import fetchWrapper from "@/utils/common/fetchWrapper";

interface GetProjectResponse {
	engTitle: string;
}

export async function getProject({ engTitle }: GetProjectResponse) {
	const url = `/api/project?engTitle=${engTitle}`;
	const response = await fetchWrapper<Project>(url, {
		method: "GET",
	});
	return response;
}
