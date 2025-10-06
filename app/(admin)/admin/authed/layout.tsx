import { postUserServer } from "@/apis/auth/server/post.user";
import { getPosts } from "@/apis/posts";
import { getProjects } from "@/apis/projects";
import {
  QUERY_KEY_POSTS,
  QUERY_KEY_PROJECTS,
  QUERY_KEY_USER,
} from "@/constants/query.constants";
import { AuthProvider } from "@/contexts/auth.context";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";
import AdminHeader from "./_components/AdminHeader";

async function AdminLayout({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_USER],
    queryFn: () => postUserServer(),
  });

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_PROJECTS],
    queryFn: () => getProjects(),
  });
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_POSTS],
    queryFn: () => getPosts(),
  });

  const user = await queryClient.getQueryData([QUERY_KEY_USER]);
  if (!user) return redirect("/admin");

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
