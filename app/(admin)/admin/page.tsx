import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { QUERY_KEY_USER } from "@/constants/query.constants";
import { prefetchUser } from "@/lib/prefetch";
import type { User } from "@/types/user.types";
import { createClient } from "@/utils/supabase/server";
import AdminLoginTemplate from "./_components/login-page-template";

async function AdminLoginPage() {
	const queryClient = new QueryClient();
	const supabase = await createClient();

	await prefetchUser(supabase, queryClient);

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
