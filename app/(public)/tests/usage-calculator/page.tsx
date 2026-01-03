import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/auth.context";
import { prefetchUser } from "@/lib/prefetch";
import { createClient } from "@/utils/supabase/server";
import UsageCalculatorTemplate from "./_components/UsageCalculatorTemplate";

async function UsageCalculatorPage() {
	const queryClient = new QueryClient();
	const supabase = await createClient();
	await prefetchUser(supabase, queryClient);

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<AuthProvider>
				<div className="mx-auto flex h-full w-full flex-col items-center justify-center px-4 sm:px-0 md:max-w-[684px]">
					<UsageCalculatorTemplate />
				</div>
			</AuthProvider>
		</HydrationBoundary>
	);
}

export default UsageCalculatorPage;
