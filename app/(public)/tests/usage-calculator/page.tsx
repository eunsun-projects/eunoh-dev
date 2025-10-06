import { postUserServer } from "@/apis/auth/server/post.user";
import { QUERY_KEY_USER } from "@/constants/query.constants";
import { AuthProvider } from "@/contexts/auth.context";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
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
        <div className="max-w-[684px] mx-auto h-dvh min-h-dvh flex flex-col items-center justify-center">
          <UsageCalculatorTemplate />
        </div>
      </AuthProvider>
    </HydrationBoundary>
  );
}

export default UsageCalculatorPage;
