import { cookies } from "next/headers";
import type { User } from "@/types/user.types";
import fetchWrapper from "@/utils/common/fetchWrapper";

export async function postUserServer(): Promise<User | null> {
	const url = "/api/auth/user";
	try {
		// 서버 사이드에서 내부 API를 호출할 때는 현재 요청의 쿠키를 명시적으로 전달해야 함
		const cookieStore = await cookies();
		const cookieHeader = cookieStore
			.getAll()
			.map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
			.join("; ");

		const data = await fetchWrapper<User>(url, {
			method: "GET",
			headers: {
				...(cookieHeader ? { cookie: cookieHeader } : {}),
			},
			// next: { tags: ["users"] },
		});
		return data;
	} catch (error: unknown) {
		// console.error("error in post user server ===>", error);
		return null;
	}
}

// export async function postUserServer(
//   userId: string | null,
// ): Promise<User | null> {
//   if (!userId) return null;
//   const url = "/api/auth/user";
//   try {
//     const data = await fetchWrapper<User>(url, {
//       method: "POST",
//       body: JSON.stringify({ userId }),
//       cache: "no-store",
//       next: { tags: ["users"] },
//     });
//     return data;
//   } catch (error: unknown) {
//     if (error instanceof Error && error.message === "Auth session missing!") {
//       return null;
//     }
//     throw error;
//   }
// }
