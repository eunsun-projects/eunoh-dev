import { getSupabaseCookies } from "@/utils/supabase/get-supabase-cookies";
import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const supabaseCookies = await getSupabaseCookies();

  if (supabaseCookies.length === 0) {
    // 쿠키가 없으면 그냥 401 리턴
    return NextResponse.json({ error: "Cookie not found" }, { status: 401 });
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    if (error.message === "Auth session missing!") {
      await supabase.auth.signOut();

      await supabase.auth.setSession({
        access_token: "",
        refresh_token: "",
      });

      return NextResponse.json(
        { user: null, error: "Auth session missing!" },
        { status: 401 },
      );
    }

    if (error.message === "Unauthorized")
      return NextResponse.json(
        { user: null, error: "인증되지 않은 사용자입니다." },
        { status: 401 },
      );

    return NextResponse.json(
      { user: null, error: error?.message },
      { status: 401 },
    );
  }
  if (!user) {
    return NextResponse.json(
      { error: "Logged in user not found" },
      { status: 404 },
    );
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (userError) {
    console.error(userError);
    return NextResponse.json({ error: userError?.message }, { status: 401 });
  }

  // console.log("userData", userData);

  return NextResponse.json(userData, { status: 200 });
}

// 서버에서 요청할 때
export async function POST(req: NextRequest) {
  // const { userId } = await req.json();
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("error in post user route ===>", error);
    return NextResponse.json({ error: error?.message }, { status: 401 });
  }

  if (!user) {
    return NextResponse.json(
      { error: "Logged in user not found" },
      { status: 404 },
    );
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (userError) {
    console.error(userError);
    return NextResponse.json({ error: userError?.message }, { status: 401 });
  }

  return NextResponse.json(userData, { status: 200 });
}
