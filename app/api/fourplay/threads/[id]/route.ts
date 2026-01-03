import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

type Params = { params: Promise<{ id: string }> };

// GET /api/fourplay/threads/:id - 스레드 + turns 조회
export async function GET(_req: Request, { params }: Params) {
	const { id } = await params;
	const supabase = await createClient();

	// 인증 확인
	const {
		data: { user: authUser },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !authUser) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	// admin 권한 확인
	const { data: userData, error: userError } = await supabase
		.from("users")
		.select("isAdmin")
		.eq("id", authUser.id)
		.single();

	if (userError || !userData?.isAdmin) {
		return NextResponse.json(
			{ error: "Private experiment - admin only" },
			{ status: 403 },
		);
	}

	// 스레드 조회 (RLS가 본인 것만 반환)
	const { data: thread, error: threadError } = await supabase
		.from("fourplay_threads")
		.select("*")
		.eq("id", id)
		.single();

	if (threadError) {
		if (threadError.code === "PGRST116") {
			return NextResponse.json({ error: "Thread not found" }, { status: 404 });
		}
		return NextResponse.json({ error: threadError.message }, { status: 500 });
	}

	// turns 조회
	const { data: turns, error: turnsError } = await supabase
		.from("fourplay_turns")
		.select("*")
		.eq("thread_id", id)
		.order("turn_index", { ascending: true });

	if (turnsError) {
		return NextResponse.json({ error: turnsError.message }, { status: 500 });
	}

	return NextResponse.json({ thread, turns }, { status: 200 });
}

// PATCH /api/fourplay/threads/:id - 스레드 상태 업데이트
export async function PATCH(req: Request, { params }: Params) {
	const { id } = await params;
	const supabase = await createClient();

	// 인증 확인
	const {
		data: { user: authUser },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !authUser) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	// admin 권한 확인
	const { data: userData, error: userError } = await supabase
		.from("users")
		.select("isAdmin")
		.eq("id", authUser.id)
		.single();

	if (userError || !userData?.isAdmin) {
		return NextResponse.json(
			{ error: "Private experiment - admin only" },
			{ status: 403 },
		);
	}

	const body = await req.json();
	const { status, final_decision } = body as {
		status?: string;
		final_decision?: Record<string, unknown>;
	};

	const updateData: Record<string, unknown> = {};
	if (status) updateData.status = status;
	if (final_decision) updateData.final_decision = final_decision;

	if (Object.keys(updateData).length === 0) {
		return NextResponse.json(
			{ error: "No update data provided" },
			{ status: 400 },
		);
	}

	const { data: thread, error: updateError } = await supabase
		.from("fourplay_threads")
		.update(updateData)
		.eq("id", id)
		.select()
		.single();

	if (updateError) {
		return NextResponse.json({ error: updateError.message }, { status: 500 });
	}

	return NextResponse.json(thread, { status: 200 });
}
