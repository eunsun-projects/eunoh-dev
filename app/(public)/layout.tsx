import type { PropsWithChildren } from "react";
import MainLayout from "@/components/common/main-layout";
import { UiStateProvider } from "@/contexts/ready.context";
import { OverScroll } from "./_components/ui";
import Footer from "./_components/ui/Footer";

function PublicLayout({ children }: PropsWithChildren) {
	return (
		<UiStateProvider>
			<OverScroll />
			<div className="min-h-full">
				<MainLayout>{children}</MainLayout>
				<Footer />
			</div>
		</UiStateProvider>
	);
}

export default PublicLayout;
