import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/auth.context";
import { prefetchUser } from "@/lib/prefetch";
import { createClient } from "@/utils/supabase/server";
import FourplayTemplate from "./_components/fourplay-template";

async function FourplayPage() {
	const supabase = await createClient();
	const queryClient = new QueryClient();

	await prefetchUser(supabase, queryClient);

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<AuthProvider>
				<FourplayTemplate />
			</AuthProvider>
		</HydrationBoundary>
	);
}

export default FourplayPage;
