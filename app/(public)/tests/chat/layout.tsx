import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: "Chat",
	description: "Chat",
};

export default function ChatLayout({ children }: PropsWithChildren) {
	return (
		<section className="absolute top-0 left-0 z-50 h-auto min-h-dvh w-dvw bg-[#01008a]">
			{children}
		</section>
	);
}
