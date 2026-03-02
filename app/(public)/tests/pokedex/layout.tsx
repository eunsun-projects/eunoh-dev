import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { PropsWithChildren } from "react";
import { Back } from "@/app/(public)/_components/ui";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: "포켓몬 도감",
	description: "포켓몬 도감 테스트",
};

const geist = Geist({
	subsets: ["latin"],
	display: "swap",
});

export default function PokedexLayout({ children }: PropsWithChildren) {
	return (
		<section
			className={cn(
				"absolute inset-0 z-1002 h-auto w-svw bg-white",
				geist.className,
			)}
		>
			<Back
				className="absolute top-1 right-1 z-1005"
				iconClassName="text-black"
			/>
			{children}
		</section>
	);
}
