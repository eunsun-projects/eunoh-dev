import type { Post } from "@/types/post.types";
import fetchWrapper from "@/utils/common/fetchWrapper";

export async function getPost(engTitle: string) {
  const url = `/api/posts/${engTitle}`;
  try {
    const response = await fetchWrapper<Post>(url, {
      method: "GET",
    });
    return response;
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw error;
  }
}
