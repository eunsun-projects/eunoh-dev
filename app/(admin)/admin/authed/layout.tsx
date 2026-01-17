import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";
import { QUERY_KEY_USER } from "@/constants/query.constants";
import { AuthProvider } from "@/contexts/auth.context";
import { prefetchAll } from "@/lib/prefetch";
import type { User } from "@/types/user.types";
import { createClient } from "@/utils/supabase/server";
import AdminHeader from "./_components/AdminHeader";

async function AdminLayout({ children }: PropsWithChildren) {
	const queryClient = new QueryClient();
	const supabase = await createClient();

	await prefetchAll(supabase, queryClient);

	const user: User | undefined = await queryClient.getQueryData([
		QUERY_KEY_USER,
	]);
	if (!user || !user.isAdmin) return redirect("/admin");

	const dehydratedState = dehydrate(queryClient);

	return (
		// <Suspense fallback={<div>Loading...</div>}>
		<HydrationBoundary state={dehydratedState}>
			<AuthProvider>
				<AdminHeader />
				{children}
			</AuthProvider>
		</HydrationBoundary>
		// </Suspense>
	);
}

export default AdminLayout;
