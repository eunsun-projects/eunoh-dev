import { useQuery } from "@tanstack/react-query";
import { getUserClient } from "@/apis/apis-auth-client";
import { QUERY_KEY_USER } from "@/constants/query.constants";

interface UseUserQueryProps {
	enabled: boolean;
}

export function useUserQuery({ enabled }: UseUserQueryProps) {
	return useQuery({
		queryKey: [QUERY_KEY_USER],
		queryFn: getUserClient,
		enabled,
	});
}
