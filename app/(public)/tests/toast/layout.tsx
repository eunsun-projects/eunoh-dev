import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { PropsWithChildren } from "react";
import { Back } from "@/app/(public)/_components/ui";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: "토스트",
	description: "토스트 UI 테스트",
};

const geist = Geist({
	subsets: ["latin"],
	display: "swap",
});

export default function ToastLayout({ children }: PropsWithChildren) {
	return (
		<section
			className={cn(
				"absolute inset-0 z-1002 flex min-h-svh w-svw items-center justify-center bg-white",
				geist.className,
			)}
		>
			<Back className="absolute top-1 right-1" iconClassName="text-black" />
			{children}
		</section>
	);
}
