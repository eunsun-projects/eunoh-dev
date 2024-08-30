import { PartialProject } from "@/types/project.types";
import fetchWrapper from "@/utils/common/fetchWrapper";

export async function postProject(newProject: PartialProject) {
    const url = "/api/projects";
    try {
        const response = await fetchWrapper<PartialProject>(url, {
            method: "POST",
            body: JSON.stringify(newProject),
        });
        return response;
    } catch (error) {
        throw error;
    }
}
