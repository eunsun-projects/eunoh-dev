import type React from "react";
import { UiStateProvider } from "@/contexts/ready.context";
import { OverScroll } from "./_components/ui";
import Footer from "./_components/ui/Footer";

function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<UiStateProvider>
			<OverScroll />
			<div className="min-h-full">
				<main className="mx-auto min-h-[calc(100dvh-128px-28px)] max-w-[640px] pt-[64px] xl:pt-[128px]">
					{children}
				</main>
				<Footer />
			</div>
		</UiStateProvider>
	);
}

export default MainLayout;
