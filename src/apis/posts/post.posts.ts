import { PartialPost, Post } from '@/types/post.types';
import fetchWrapper from '@/utils/common/fetchWrapper';

export async function postPost(body: PartialPost) {
  const url = '/api/posts';
  try {
    const response = await fetchWrapper<Post>(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return response;
  } catch (error) {
    throw error;
  }
}
