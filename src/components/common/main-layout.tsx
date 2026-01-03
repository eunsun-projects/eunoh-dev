"use client";

import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

function MainLayout({ children }: PropsWithChildren) {
	const pathname = usePathname();
	const isFourplay = pathname === "/fourplay";
	return (
		<main
			className={cn(
				"mx-auto min-h-[calc(100dvh-128px-28px)] max-w-[640px] pt-[64px] xl:pt-[128px]",
				isFourplay && "xl:pt-[64px]",
			)}
		>
			{children}
		</main>
	);
}

export default MainLayout;
