import { postUserServer } from '@/apis/auth/server/post.user';
import { getProjects } from '@/apis/projects';
import { QUERY_KEY_PROJECTS, QUERY_KEY_USER } from '@/constants/query.constants';
import { AuthProvider } from '@/contexts/auth.context';
import { getUserFromHeader } from '@/utils/auth/getUserFromHeader';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { PropsWithChildren, Suspense } from 'react';
import AdminHeader from './_components/AdminHeader';

type AdminLayoutProps = PropsWithChildren;

async function AdminLayout({ children }: AdminLayoutProps) {
  const userId = getUserFromHeader();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_USER],
    queryFn: () => postUserServer(userId),
  });
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_PROJECTS],
    queryFn: () => getProjects(),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HydrationBoundary state={dehydratedState}>
        <AuthProvider>
          <AdminHeader />
          {children}
        </AuthProvider>
      </HydrationBoundary>
    </Suspense>
  );
}

export default AdminLayout;
