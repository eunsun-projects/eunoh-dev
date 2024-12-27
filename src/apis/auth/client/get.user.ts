import { ErrorResponse } from '@/types/error.types';
import { User } from '@/types/user.types';
import fetchWrapper from '@/utils/common/fetchWrapper';

export async function getUserClient(): Promise<User | null> {
  const url = `/api/auth/user`;
  try {
    const data = await fetchWrapper<User | ErrorResponse>(url, {
      method: 'GET',
      next: { tags: ['user'] },
    });
    if ('error' in data) {
      if (data.error === 'Auth session missing!') {
        return null;
      }
      return null;
    }
    return data;
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Auth session missing!') {
      return null;
    }
    throw error;
  }
}
