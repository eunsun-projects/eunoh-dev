import type { SupabaseClient } from "@supabase/supabase-js";
import { NotFoundError } from "@/errors";
import { checkSupabaseError } from "@/errors/supabase";
import type { Database } from "@/types/supabase";

export async function getProjects(supabase: SupabaseClient<Database>) {
	const { data, error } = await supabase
		.from("projects")
		.select("*")
		.eq("isView", true)
		.order("number", { ascending: true });

	if (error) checkSupabaseError(error);

	return data;
}

export async function getProject(
	supabase: SupabaseClient<Database>,
	engTitle: string,
) {
	const { data, error } = await supabase
		.from("projects")
		.select("*")
		.eq("isView", true)
		.eq("engTitle", engTitle)
		.single();

	if (error) checkSupabaseError(error);

	return data;
}

export async function getPosts(supabase: SupabaseClient<Database>) {
	const { data, error } = await supabase
		.from("posts")
		.select(
			"id, title, engTitle, created_at, category, keywords, summary, isView, posted_at",
		)
		.order("created_at", { ascending: false });

	if (error) checkSupabaseError(error);

	return data;
}

/**
 * 서버 컴포넌트에서 직접 DB 접근하여 단일 포스트 조회
 * API 라우트를 거치지 않아 정적 생성에 적합
 */
export async function getPost(
	supabase: SupabaseClient<Database>,
	slug: string,
	isUuid: boolean,
) {
	const query = supabase.from("posts").select("*");

	if (isUuid) {
		query.eq("id", slug);
	} else {
		query.eq("engTitle", slug);
	}

	const { data, error } = await query.single();

	if (error) checkSupabaseError(error);

	return data;
}

export async function getUser(supabase: SupabaseClient<Database>) {
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error) throw error;

	if (!user) throw new NotFoundError("User not found");

	const { data: userData, error: userError } = await supabase
		.from("users")
		.select("*")
		.eq("id", user.id)
		.single();

	if (userError) checkSupabaseError(userError);

	return userData;
}

export async function getTimeCapsules(supabase: SupabaseClient<Database>) {
	const { data: timeCapsules, error } = await supabase
		.from("timecapsules")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) checkSupabaseError(error);

	return timeCapsules;
}
