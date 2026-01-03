import { cookies } from "next/headers";
import axios from "@/lib/axios";
import type { User } from "@/types/user.types";

export async function postUserServer(): Promise<User | null> {
	try {
		const cookieStore = await cookies();
		const cookieHeader = cookieStore
			.getAll()
			.map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
			.join("; ");

		return await axios.get<User>("/api/auth/user", {
			headers: {
				...(cookieHeader ? { cookie: cookieHeader } : {}),
			},
		});
	} catch {
		return null;
	}
}
