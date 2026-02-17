import type { SupabaseClient } from "@supabase/supabase-js";
import type { Iffy } from "@/app/(public)/tests/amaechild/_types/types";
import type { Database } from "@/types/supabase";

export async function getIffyById(
	supabase: SupabaseClient<Database>,
	id: string,
) {
	const { data, error } = await supabase
		.from("iffy")
		.select("*")
		.eq("id", id)
		.single();

	if (error) throw error;
	return data;
}

export async function getIffyCount(supabase: SupabaseClient<Database>) {
	const { data, error } = await supabase.from("iffy").select("*", {
		count: "exact",
	});

	if (error) throw error;
	return data.length;
}

export async function insertIffy(
	supabase: SupabaseClient<Database>,
	iffy: Iffy,
): Promise<Iffy> {
	const { data, error } = await supabase
		.from("iffy")
		.insert(iffy)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("데이터베이스 저장 중 오류가 발생했습니다.");
	}
	return data;
}

export async function updateIffyImageCompleted(
	supabase: SupabaseClient<Database>,
	id: string,
	imageUrl: string,
): Promise<Iffy> {
	const { data, error } = await supabase
		.from("iffy")
		.update({
			gift_image_url: imageUrl,
			status: "completed",
		})
		.eq("id", id)
		.select()
		.single();

	if (error) {
		throw new Error("이미지 업데이트 중 오류가 발생했습니다.");
	}
	return data;
}

export async function getCurrentUserId(
	supabase: SupabaseClient<Database>,
): Promise<string | null> {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user?.id ?? null;
}
