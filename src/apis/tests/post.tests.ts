import { SajuTestResponse } from '@/types/tests.type';
import fetchWrapper from '@/utils/common/fetchWrapper';

export async function postSajuTest({ name, birth }: { name: string; birth: string }) {
  const url = '/api/tests/saju';
  try {
    const response = await fetchWrapper<SajuTestResponse>(url, {
      method: 'POST',
      body: JSON.stringify({ name, birth }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
