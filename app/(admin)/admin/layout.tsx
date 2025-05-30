import { postUserServer } from "@/apis/auth/server/post.user";
import { getPosts } from "@/apis/posts";
import { getProjects } from "@/apis/projects";
import {
  QUERY_KEY_POSTS,
  QUERY_KEY_PROJECTS,
  QUERY_KEY_USER,
} from "@/constants/query.constants";
import { AuthProvider } from "@/contexts/auth.context";
import { getUserFromHeader } from "@/utils/auth/getUserFromHeader";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import AdminHeader from "./_components/AdminHeader";

type AdminLayoutProps = PropsWithChildren;

async function AdminLayout({ children }: AdminLayoutProps) {
  const userId = await getUserFromHeader();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_USER],
    queryFn: () => postUserServer(userId),
  });
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_PROJECTS],
    queryFn: () => getProjects(),
  });
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_POSTS],
    queryFn: () => getPosts(),
  });
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
