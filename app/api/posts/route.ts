import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import type { PartialPost } from "@/types/post.types";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
	const supabase = await createClient();

	// select without markdown column
	const { data, error } = await supabase
		.from("posts")
		.select(
			"id, title, engTitle, created_at, category, keywords, summary, isView, posted_at",
		)
		.order("created_at", { ascending: false });

	if (error) {
		revalidatePath("/", "layout");
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(data, { status: 200 });
}

export async function POST(req: Request) {
	const supabase = await createClient();

	const body: PartialPost = await req.json();

	const { data, error } = await supabase
		.from("posts")
		.upsert({
			...body,
		})
		.select()
		.single();

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	// 🔥 전략적 revalidation
	// 1. 메인 포스트 목록 페이지
	revalidatePath("/", "layout");

	// 2. 새로 생성/수정된 포스트 상세 페이지
	revalidatePath(`/posts/${data.engTitle}`, "page");

	// 3. 전체 포스트 목록 (필요시)
	revalidatePath("/posts", "page");
	return NextResponse.json(data, { status: 201 });
}
