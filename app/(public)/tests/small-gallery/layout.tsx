import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Back } from "@/app/(public)/_components/ui";

export const metadata: Metadata = {
	title: "Small Gallery",
	description: "Small Gallery",
};

export default function SmallGalleryLayout({ children }: PropsWithChildren) {
	return (
		<section className="absolute top-0 left-0 z-50 flex min-h-svh w-svw flex-col items-center justify-start">
			<Back className="absolute top-1 right-1" iconClassName="text-black" />
			{children}
		</section>
	);
}
