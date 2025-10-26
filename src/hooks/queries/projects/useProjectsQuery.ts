import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/apis/projects";
import { QUERY_KEY_PROJECTS } from "@/constants/query.constants";

export function useProjectsQuery() {
	return useQuery({
		queryKey: [QUERY_KEY_PROJECTS],
		queryFn: getProjects,
	});
}
