import { postUserServer } from "@/apis/auth/server/post.user";
import { QUERY_KEY_USER } from "@/constants/query.constants";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import AdminLoginTemplate from "./_components/login-page-template";

async function AdminLoginPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_USER],
    queryFn: () => postUserServer(),
  });

  const user = await queryClient.getQueryData([QUERY_KEY_USER]);
  if (user) return redirect("/admin/authed");

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <AdminLoginTemplate />
    </HydrationBoundary>
  );
}

export default AdminLoginPage;
