import { Project } from "@/types/project.types";
import fetchWrapper from "@/utils/common/fetchWrapper";

export async function getProjects() {
    const url = "/api/projects";
    try {
        const response = await fetchWrapper<Project[]>(url, {
            method: "GET",
            cache: "no-store",
        });
        return response;
    } catch (error) {
        throw error;
    }
}
