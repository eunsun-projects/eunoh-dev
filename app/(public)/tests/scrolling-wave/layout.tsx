import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: "ScrollingWave",
	description: "ScrollingWave",
};

export default function ScrollingWaveLayout({ children }: PropsWithChildren) {
	return (
		<section className="absolute top-0 left-0 z-50 bg-neutral-400">
			{children}
		</section>
	);
}
