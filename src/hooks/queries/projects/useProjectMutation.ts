import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postProject } from "@/apis/projects/post.project";
import { QUERY_KEY_PROJECTS } from "@/constants/query.constants";

export function useProjectMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (formData: FormData) => postProject(formData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PROJECTS] });
		},
	});
}
