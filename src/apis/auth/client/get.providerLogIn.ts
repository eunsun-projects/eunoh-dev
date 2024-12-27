import fetchWrapper from '@/utils/common/fetchWrapper';
import { OAuthResponse } from '@supabase/supabase-js';

export async function getLogInWithProvider(provider: string): Promise<OAuthResponse['data']> {
  const url = `/api/auth/provider?provider=${provider}`;
  try {
    const data = await fetchWrapper<OAuthResponse['data']>(url, {
      method: 'GET',
      next: { tags: ['user'] },
    });
    return data;
  } catch (error: unknown) {
    throw error;
  }
}
