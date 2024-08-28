import { getUserClient } from "@/apis/auth/client/get.user";
import { QUERY_KEY_USER } from "@/constants/query.constants";
import { useQuery } from "@tanstack/react-query";

export function useUserQuery() {
    return useQuery({
        queryKey: [QUERY_KEY_USER],
        queryFn: getUserClient,
    });
}
