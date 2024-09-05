import fetchWrapper from "@/utils/common/fetchWrapper";

export async function deleteLogOut(): Promise<void> {
    const url = `/api/auth/logout`;
    try {
        await fetchWrapper<void>(url, {
            method: "DELETE",
            next: { tags: ["user"] },
        });
    } catch (error: any) {
        throw error;
    }
}
