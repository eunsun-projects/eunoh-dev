import type { OAuthResponse } from "@supabase/supabase-js";
import axios from "@/lib/axios";
import type { User } from "@/types/user.types";

export async function deleteLogOut(): Promise<void> {
	return axios.delete<void>("/api/auth/logout");
}

export async function getLogInWithProvider(
	provider: string,
	next?: string,
): Promise<OAuthResponse["data"]> {
	return axios.get<OAuthResponse["data"]>(
		`/api/auth/provider?provider=${provider}&next=${next}`,
	);
}

export async function getUserClient(): Promise<User | null> {
	try {
		return await axios.get<User>("/api/auth/user");
	} catch {
		return null;
	}
}
