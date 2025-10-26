import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { postUserServer } from "@/apis/auth/server/post.user";
import { QUERY_KEY_USER } from "@/constants/query.constants";
import { AuthProvider } from "@/contexts/auth.context";
import UsageCalculatorTemplate from "./_components/UsageCalculatorTemplate";

async function UsageCalculatorPage() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: [QUERY_KEY_USER],
		queryFn: () => postUserServer(),
	});

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
