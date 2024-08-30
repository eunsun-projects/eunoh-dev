import { postProject } from "@/apis/projects/post.project";
import { QUERY_KEY_PROJECTS } from "@/constants/query.constants";
import { PartialProject } from "@/types/project.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useProjectMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProject: PartialProject) => postProject(newProject),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PROJECTS] });
        },
    });
}
