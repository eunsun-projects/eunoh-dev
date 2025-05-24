import type { PartialProject } from "@/types/project.types";
import fetchWrapper from "@/utils/common/fetchWrapper";

export async function postProject(formData: FormData) {
  const url = "/api/projects";
  try {
    const response = await fetchWrapper<PartialProject>(url, {
      method: "POST",
      body: formData,
    });
    return response;
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw error;
  }
}
