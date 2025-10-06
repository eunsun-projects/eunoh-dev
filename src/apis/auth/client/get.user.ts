import type { User } from "@/types/user.types";
import fetchWrapper from "@/utils/common/fetchWrapper";

export async function getUserClient(): Promise<User | null> {
  const url = "/api/auth/user";
  try {
    const data = await fetchWrapper<User>(url, {
      method: "GET",
      // next: { tags: ["user"] },
    });
    return data;
  } catch (error: unknown) {
    // console.error("error in get user client ===>", error);
    return null;
  }
}
