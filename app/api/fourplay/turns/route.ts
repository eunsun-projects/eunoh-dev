import { NextResponse } from "next/server";
import type { Json } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";

// POST /api/fourplay/turns - 새 턴 생성
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
	const {
		threadId,
		role,
		kind,
		model,
		selectedBy,
		nextModel,
		nextModelReason,
		payload,
		rawText,
	} = body as {
		threadId: string;
		role: "user" | "assistant" | "system" | "tool";
		kind?: string;
		model?: string;
		selectedBy?: "auto" | "user";
		nextModel?: string;
		nextModelReason?: string;
		payload?: Json;
		rawText?: string;
	};

	if (!threadId || !role) {
		return NextResponse.json(
			{ error: "threadId and role are required" },
			{ status: 400 },
		);
	}

	// 스레드 존재 여부 & 소유권 확인 (RLS도 적용됨)
	const { data: thread, error: threadError } = await supabase
		.from("fourplay_threads")
		.select("id, status")
		.eq("id", threadId)
		.single();

	if (threadError || !thread) {
		return NextResponse.json({ error: "Thread not found" }, { status: 404 });
	}

	if (thread.status === "completed") {
		return NextResponse.json(
			{ error: "Thread is already completed" },
			{ status: 400 },
		);
	}

	// 현재 최대 turn_index 조회
	const { data: lastTurn } = await supabase
		.from("fourplay_turns")
		.select("turn_index")
		.eq("thread_id", threadId)
		.order("turn_index", { ascending: false })
		.limit(1)
		.single();

	const nextTurnIndex = (lastTurn?.turn_index ?? 0) + 1;

	// 턴 생성
	const { data: turn, error: turnError } = await supabase
		.from("fourplay_turns")
		.insert({
			thread_id: threadId,
			turn_index: nextTurnIndex,
			role,
			kind,
			model,
			selected_by: selectedBy,
			next_model: nextModel,
			next_model_reason: nextModelReason,
			payload,
			raw_text: rawText,
		})
		.select()
		.single();

	if (turnError) {
		return NextResponse.json({ error: turnError.message }, { status: 500 });
	}

	return NextResponse.json(turn, { status: 201 });
}

// GET /api/fourplay/turns?threadId=xxx - 특정 스레드의 턴 목록 조회
export async function GET(req: Request) {
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

	const { searchParams } = new URL(req.url);
	const threadId = searchParams.get("threadId");

	if (!threadId) {
		return NextResponse.json(
			{ error: "threadId query param is required" },
			{ status: 400 },
		);
	}

	// turns 조회 (RLS로 본인 스레드의 턴만 조회 가능)
	const { data: turns, error: turnsError } = await supabase
		.from("fourplay_turns")
		.select("*")
		.eq("thread_id", threadId)
		.order("turn_index", { ascending: true });

	if (turnsError) {
		return NextResponse.json({ error: turnsError.message }, { status: 500 });
	}

	return NextResponse.json(turns, { status: 200 });
}
