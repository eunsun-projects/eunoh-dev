import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Back } from "../../_components/ui";

export const metadata: Metadata = {
	title: "Chat",
	description: "Chat",
};

export default function ChatLayout({ children }: PropsWithChildren) {
	return (
		<section className="absolute top-0 left-0 z-50 h-auto min-h-svh w-svw bg-[#01008a]">
			<Back className="absolute top-1 right-1" />
			{children}
		</section>
	);
}
