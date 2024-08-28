import { getUserServer } from "@/apis/auth/server/get.user";
import { QUERY_KEY_USER } from "@/constants/query.constants";
import { AuthProvider } from "@/contexts/auth.context";
import { getUserFromHeader } from "@/utils/auth/getUserFromHeader";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { PropsWithChildren, Suspense } from "react";

type AdminLayoutProps = PropsWithChildren;

async function AdminLayout({ children }: AdminLayoutProps) {
    const userId = getUserFromHeader();

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY_USER],
        queryFn: () => getUserServer(userId),
    });
    const dehydratedState = dehydrate(queryClient);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HydrationBoundary state={dehydratedState}>
                <AuthProvider>{children}</AuthProvider>
            </HydrationBoundary>
        </Suspense>
    );
}

export default AdminLayout;
