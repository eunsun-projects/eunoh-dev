import { getUserClient } from "@/apis/auth/client";
import { QUERY_KEY_USER } from "@/constants/query.constants";
import { useQuery } from "@tanstack/react-query";

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
