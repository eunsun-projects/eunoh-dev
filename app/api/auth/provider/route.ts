import { PUBLIC_URL } from "@/constants/common.constants";
import { QUERY_KEY_USER } from "@/constants/query.constants";
import { createClient } from "@/utils/supabase/server";
import type { Provider } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get("provider");
  const next = searchParams.get("next");

  const queryClient = new QueryClient();
  const supabase = await createClient();
  if (!PUBLIC_URL) {
    return NextResponse.json(
      { error: "PUBLIC_URL is not set" },
      { status: 401 }
    );
  }

  const getURL = () => {
    let url =
      PUBLIC_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000/";
    // Make sure to include `https://` when not localhost.
    url = url.startsWith("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.endsWith("/") ? url : `${url}/`;
    return url;
  };

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider as Provider,
    options: {
      // redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
      redirectTo: `${getURL()}/api/auth/callback?next=${next}`,
    },
  });

  if (error) {
    return NextResponse.json({ error: error?.message }, { status: 401 });
  }

  queryClient.invalidateQueries({
    queryKey: [QUERY_KEY_USER],
  });

  return NextResponse.json(data, { status: 200 });
}
