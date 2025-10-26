import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: "Saju",
	description: "Saju",
};

export default function SajuLayout({ children }: PropsWithChildren) {
	return (
		<section className="absolute top-0 left-0 z-50 h-auto min-h-dvh w-dvw bg-neutral-400">
			{children}
		</section>
	);
}
