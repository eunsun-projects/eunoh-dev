import { postUserServer } from "@/apis/auth/server/post.user";
import { getTimeCapsules } from "@/apis/tests/api.tests";
import {
  QUERY_KEY_TIME_CAPSULES,
  QUERY_KEY_USER,
} from "@/constants/query.constants";
import { getUserFromHeaders } from "@/utils/common/getUserFromHeaders";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata, Viewport } from "next";
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
  const userId = await getUserFromHeaders();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_USER],
    queryFn: () => postUserServer(userId),
  });

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_TIME_CAPSULES],
    queryFn: () => getTimeCapsules(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    // <Suspense fallback={<Loading />}>
    <HydrationBoundary state={dehydratedState}>
      <TimeCapsuleTemplate />
    </HydrationBoundary>
    // </Suspense>
  );
}

export default TimeCapsulePage;
