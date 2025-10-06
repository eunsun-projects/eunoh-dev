import fetchWrapper from "@/utils/common/fetchWrapper";
import type { OAuthResponse } from "@supabase/supabase-js";

export async function getLogInWithProvider(
  provider: string,
  next?: string,
): Promise<OAuthResponse["data"]> {
  const url = `/api/auth/provider?provider=${provider}&next=${next}`;
  try {
    const data = await fetchWrapper<OAuthResponse["data"]>(url, {
      method: "GET",
      // next: { tags: ["user"] },
    });
    return data;
  } catch (error: unknown) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw error;
  }
}
