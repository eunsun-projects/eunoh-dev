import axios from "@/lib/axios";
import type { PartialPost, Post } from "@/types/post.types";

interface GetPostParams {
	engTitle?: string;
	id?: string;
}

export async function getPost({ engTitle, id }: GetPostParams) {
	const path = engTitle ? engTitle : id;
	return axios.get<Post>(`/api/posts/${path}`);
}

export async function getPosts() {
	return axios.get<Post[]>("/api/posts");
}

export async function postPost(body: PartialPost) {
	return axios.post<Post>("/api/posts", body);
}
