import { Post } from '@/types/post.types';
import fetchWrapper from '@/utils/common/fetchWrapper';

export async function getPost(id: string) {
  const url = `/api/posts/${id}`;
  try {
    const response = await fetchWrapper<Post>(url, {
      method: 'GET',
    });
    return response;
  } catch (error) {
    throw error;
  }
}
