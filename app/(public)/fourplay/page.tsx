import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { QUERY_KEY_USER } from "@/constants/query.constants";
import { AuthProvider } from "@/contexts/auth.context";
import { createClient } from "@/utils/supabase/server";
import FourplayTemplate from "./_components/fourplay-template";

async function FourplayPage() {
	const supabase = await createClient();
	const queryClient = new QueryClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user?.id) {
		await queryClient.prefetchQuery({
			queryKey: [QUERY_KEY_USER],
			queryFn: async () => {
				const { data: userData } = await supabase
					.from("users")
					.select("*")
					.eq("id", user?.id)
					.single();

				return userData;
			},
		});
	}

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
