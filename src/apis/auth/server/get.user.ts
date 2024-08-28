import { User } from "@/types/user.types";
import fetchWrapper from "@/utils/common/fetchWrapper";

export async function getUserServer(userId: string | null): Promise<User | null> {
    const url = `/api/auth/user?userId=${userId}`;
    try {
        if (!userId) return null;

        const data = await fetchWrapper<User>(url, {
            method: "GET",
            cache: "no-store",
            next: { tags: ["users"] },
        });
        return data;
    } catch (error: any) {
        if (error.message === "Auth session missing!") {
            return null; // 에러를 throw 하지 않고 null 반환하는 것이 올바른 방법인지 확인해보기
        }
        throw error;
    }
}
