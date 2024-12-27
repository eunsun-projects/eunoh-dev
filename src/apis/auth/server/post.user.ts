import { User } from '@/types/user.types';
import fetchWrapper from '@/utils/common/fetchWrapper';

export async function postUserServer(userId: string | null): Promise<User | null> {
  if (!userId) return null;
  const url = `/api/auth/user`;
  try {
    const data = await fetchWrapper<User>(url, {
      method: 'POST',
      body: JSON.stringify({ userId }),
      cache: 'no-store',
      next: { tags: ['users'] },
    });
    return data;
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Auth session missing!') {
      return null;
    }
    throw error;
  }
}
