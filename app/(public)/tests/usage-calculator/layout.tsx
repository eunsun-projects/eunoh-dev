import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Back } from "@/app/(public)/_components/ui";

export const metadata: Metadata = {
	title: "Usage Calculator",
	description: "Usage Calculator",
};

export default function UsageLayout({ children }: PropsWithChildren) {
	return (
		<section className="absolute top-0 left-0 z-50 flex h-svh min-h-svh w-svw flex-col items-center justify-start bg-neutral-700">
			<Back className="absolute top-1 right-1" iconClassName="text-white" />
			{children}
		</section>
	);
}
