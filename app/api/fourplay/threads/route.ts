import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// POST /api/fourplay/threads - 새 스레드 생성 + 첫 번째 user turn
export async function POST(req: Request) {
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

	// body 파싱
	const body = await req.json();
	const { title, firstMessage } = body as {
		title?: string;
		firstMessage: string;
	};

	if (!firstMessage) {
		return NextResponse.json(
			{ error: "firstMessage is required" },
			{ status: 400 },
		);
	}

	// 1. Thread 생성
	const { data: thread, error: threadError } = await supabase
		.from("fourplay_threads")
		.insert({
			user_id: authUser.id,
			title: title || firstMessage.slice(0, 50),
			status: "active",
		})
		.select()
		.single();

	if (threadError) {
		return NextResponse.json({ error: threadError.message }, { status: 500 });
	}

	// 2. 첫 번째 user turn 생성
	const { error: turnError } = await supabase.from("fourplay_turns").insert({
		thread_id: thread.id,
		turn_index: 1,
		role: "user",
		raw_text: firstMessage,
	});

	if (turnError) {
		// 롤백: thread 삭제
		await supabase.from("fourplay_threads").delete().eq("id", thread.id);
		return NextResponse.json({ error: turnError.message }, { status: 500 });
	}

	return NextResponse.json({ threadId: thread.id }, { status: 201 });
}

// GET /api/fourplay/threads - 스레드 목록 조회
export async function GET() {
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

	// 스레드 목록 조회 (본인 것만 - RLS로도 제한됨)
	const { data: threads, error: threadsError } = await supabase
		.from("fourplay_threads")
		.select("id, title, status, created_at, updated_at")
		.eq("user_id", authUser.id)
		.order("updated_at", { ascending: false });

	if (threadsError) {
		return NextResponse.json({ error: threadsError.message }, { status: 500 });
	}

	return NextResponse.json(threads, { status: 200 });
}
