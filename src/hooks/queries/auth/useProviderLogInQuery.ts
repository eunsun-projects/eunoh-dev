import type { OAuthResponse } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { getLogInWithProvider } from "@/apis/auth/client";
import { QUERY_KEY_USER } from "@/constants/query.constants";

export function useProviderLogInQuery(provider: string) {
	return useQuery<OAuthResponse["data"] | Error>({
		queryKey: [QUERY_KEY_USER],
		queryFn: () => getLogInWithProvider(provider),
	});
}
