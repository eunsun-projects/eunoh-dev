import { getProjects } from '@/apis/projects';
import { QUERY_KEY_PROJECTS } from '@/constants/query.constants';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import Loading from '../loading';
import Home from './_components/Home';

async function MainPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_PROJECTS],
    queryFn: () => getProjects(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydratedState}>
        <Home />
      </HydrationBoundary>
    </Suspense>
  );
}

export default MainPage;
