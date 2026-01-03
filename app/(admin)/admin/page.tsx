import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { postUserServer } from "@/apis/apis-auth-server";
import { QUERY_KEY_USER } from "@/constants/query.constants";
import type { User } from "@/types/user.types";
import AdminLoginTemplate from "./_components/login-page-template";

async function AdminLoginPage() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: [QUERY_KEY_USER],
		queryFn: () => postUserServer(),
	});

	const user: User | undefined = await queryClient.getQueryData([
		QUERY_KEY_USER,
	]);
	if (user?.isAdmin) return redirect("/admin/authed");

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<AdminLoginTemplate />
		</HydrationBoundary>
	);
}

export default AdminLoginPage;
