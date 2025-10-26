import type { Post } from "@/types/post.types";
import fetchWrapper from "@/utils/common/fetchWrapper";

interface GetPostResponse {
	engTitle?: string;
	id?: string;
}

export async function getPost({ engTitle, id }: GetPostResponse) {
	const path = engTitle ? engTitle : id;
	const url = `/api/posts/${path}`;
	const response = await fetchWrapper<Post>(url, {
		method: "GET",
	});
	return response;
}
