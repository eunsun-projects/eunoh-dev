import type { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { getSupabaseCookies } from "./get-supabase-cookies";

export async function updateSession(request: NextRequest) {
  // const requestHeaders = new Headers(request.headers);

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const supabaseCookies = await getSupabaseCookies();

  if (supabaseCookies.length === 0) {
    // auth session error 방지를 위해 쿠키가 없으면 그냥 리턴
    return supabaseResponse;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("error in middleware ===>", error);
  }

  if (!user) {
    console.error("user not found in middleware");
  }

  if (
    !user &&
    request.nextUrl.pathname !== "/" &&
    request.nextUrl.pathname !== "/admin" &&
    !request.nextUrl.pathname.startsWith("/matterport-assets") &&
    !request.nextUrl.pathname.startsWith("/assets") &&
    !request.nextUrl.pathname.startsWith("/skills") &&
    !request.nextUrl.pathname.startsWith("/projects") &&
    !request.nextUrl.pathname.startsWith("/posts") &&
    !request.nextUrl.pathname.startsWith("/tests") &&
    !request.nextUrl.pathname.startsWith("/api") &&
    !request.nextUrl.pathname.startsWith("/loading")
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  // if (user) {
  //   requestHeaders.set("x-user", user.id);

  //   // 새로운 응답 객체 생성
  //   supabaseResponse = NextResponse.next({
  //     request: {
  //       headers: requestHeaders,
  //     },
  //   });
  // }

  return supabaseResponse;
}
