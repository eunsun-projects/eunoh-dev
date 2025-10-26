import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Back } from "../../_components/ui";

export const metadata: Metadata = {
	title: "ScrollingWave",
	description: "ScrollingWave",
};

export default function ScrollingWaveLayout({ children }: PropsWithChildren) {
	return (
		<section className="absolute top-0 left-0 z-50 bg-neutral-400">
			<Back className="fixed top-1 right-1 z-50" iconClassName="text-white" />
			{children}
		</section>
	);
}
