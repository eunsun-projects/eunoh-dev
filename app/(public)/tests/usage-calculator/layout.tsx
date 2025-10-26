import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
	title: "Usage Calculator",
	description: "Usage Calculator",
};

export default function UsageLayout({ children }: PropsWithChildren) {
	return (
		<section className="absolute top-0 left-0 z-50 flex h-dvh min-h-dvh w-dvw flex-col items-center justify-start bg-neutral-700">
			{children}
			<Toaster richColors position="top-center" />
		</section>
	);
}
