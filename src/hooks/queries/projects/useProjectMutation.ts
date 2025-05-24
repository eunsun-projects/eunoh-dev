import { postProject } from "@/apis/projects/post.project";
import { QUERY_KEY_PROJECTS } from "@/constants/query.constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useProjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => postProject(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PROJECTS] });
    },
  });
}
