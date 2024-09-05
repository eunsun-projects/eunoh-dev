import { ErrorResponse } from "@/types/error.types";
import { User } from "@/types/user.types";
import fetchWrapper from "@/utils/common/fetchWrapper";

export async function getUserClient(): Promise<User | null> {
    const url = `/api/auth/user`;
    try {
        const data = await fetchWrapper<User | ErrorResponse>(url, {
            method: "GET",
            next: { tags: ["user"] },
        });
        if ("error" in data) {
            if (data.error === "Auth session missing!") {
                return null;
            }
            return null;
        }
        return data;
    } catch (error: any) {
        if (error.message === "Auth session missing!") {
            return null; // 에러를 throw 하지 않고 null 반환하는 것이 올바른 방법인지 확인해보기
        }
        throw error;
    }
}
