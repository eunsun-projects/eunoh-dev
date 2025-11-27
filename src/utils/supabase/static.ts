import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

/**
 * 정적 생성(SSG/ISR)용 Supabase 클라이언트
 * cookies() 같은 동적 함수를 사용하지 않아 빌드 시점에서 안전하게 사용 가능
 */
export function createStaticClient() {
	return createSupabaseClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	);
}
