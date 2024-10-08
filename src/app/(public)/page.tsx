import { getProjects } from "@/apis/projects";
import { QUERY_KEY_PROJECTS } from "@/constants/query.constants";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import MainComponent from "./_components/MainComponent";

async function MainPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_PROJECTS],
    queryFn: () => getProjects(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HydrationBoundary state={dehydratedState}>
        <MainComponent />
      </HydrationBoundary>
    </Suspense>
  );
}

export default MainPage;
