import type { OAuthResponse } from "@supabase/supabase-js";
import fetchWrapper from "@/utils/common/fetchWrapper";

export async function getLogInWithProvider(
	provider: string,
	next?: string,
): Promise<OAuthResponse["data"]> {
	const url = `/api/auth/provider?provider=${provider}&next=${next}`;
	const data = await fetchWrapper<OAuthResponse["data"]>(url, {
		method: "GET",
		// next: { tags: ["user"] },
	});
	return data;
}
