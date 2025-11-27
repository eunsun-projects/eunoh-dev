import { cache } from "react";
import type { Post } from "@/types/post.types";
import { isUUID } from "@/utils/common/isUUID";
import { createStaticClient } from "@/utils/supabase/static";

/**
 * 서버 컴포넌트에서 직접 DB 접근하여 단일 포스트 조회
 * API 라우트를 거치지 않아 정적 생성에 적합
 */
export const getPostServer = cache(
	async (slug: string): Promise<Post | null> => {
		const supabase = createStaticClient();

		const isUuid = isUUID(slug);

		const query = supabase.from("posts").select("*");

		if (isUuid) {
			query.eq("id", slug);
		} else {
			query.eq("engTitle", slug);
		}

		const { data, error } = await query.single();

		if (error) {
			console.error("Error fetching post:", error.message);
			return null;
		}

		return data as Post;
	},
);

/**
 * 서버 컴포넌트에서 직접 DB 접근하여 모든 포스트 목록 조회
 * generateStaticParams에서 사용
 */
export const getPostsServer = cache(async (): Promise<Post[]> => {
	const supabase = createStaticClient();

	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching posts:", error.message);
		return [];
	}

	return (data as Post[]) ?? [];
});
