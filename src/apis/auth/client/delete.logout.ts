import fetchWrapper from "@/utils/common/fetchWrapper";

export async function deleteLogOut(): Promise<void> {
	const url = "/api/auth/logout";
	await fetchWrapper<void>(url, {
		method: "DELETE",
		// next: { tags: ["user"] },
	});
}
