import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  await supabase.auth.setSession({
    access_token: "",
    refresh_token: "",
  });

  if (error) {
    return NextResponse.json("Logout failed", { status: 500 });
  }

  return NextResponse.json("Logout successful", { status: 200 });
}
