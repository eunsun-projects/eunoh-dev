import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const engTitle = searchParams.get("engTitle");

	if (!engTitle) {
		return NextResponse.json(
			{ error: "engTitle is required" },
			{ status: 400 },
		);
	}

	const supabase = await createClient();

	const { data, error } = await supabase
		.from("projects")
		.select("*")
		.eq("isView", true)
		.eq("engTitle", engTitle)
		.single();

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(data, { status: 200 });
}
