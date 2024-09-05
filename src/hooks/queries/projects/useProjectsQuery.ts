import { getProjects } from "@/apis/projects";
import { QUERY_KEY_PROJECTS } from "@/constants/query.constants";
import { useQuery } from "@tanstack/react-query";

export function useProjectsQuery() {
    return useQuery({
        queryKey: [QUERY_KEY_PROJECTS],
        queryFn: getProjects,
    });
}
