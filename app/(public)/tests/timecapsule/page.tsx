import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/contexts/auth.context";
import { prefetchTimeCapsules, prefetchUser } from "@/lib/prefetch";
import { createClient } from "@/utils/supabase/server";
import TimeCapsuleTemplate from "./_components/TimeCapsuleTemplate";

export const metadata: Metadata = {
	title: "TimeCapsule",
	description: "TimeCapsule",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	viewportFit: "cover",
};

async function TimeCapsulePage() {
	const queryClient = new QueryClient();
	const supabase = await createClient();

	await prefetchUser(supabase, queryClient);
	await prefetchTimeCapsules(supabase, queryClient);

	const dehydratedState = dehydrate(queryClient);

	return (
		// <Suspense fallback={<Loading />}>
		<HydrationBoundary state={dehydratedState}>
			<AuthProvider>
				<TimeCapsuleTemplate />
			</AuthProvider>
		</HydrationBoundary>
		// </Suspense>
	);
}

export default TimeCapsulePage;
