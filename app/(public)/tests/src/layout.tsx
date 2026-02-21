import type { Metadata, Viewport } from "next";
import type { PropsWithChildren } from "react";
import { Back } from "@/app/(public)/_components/ui";

export const metadata: Metadata = {
	title: "src",
	description: "EunOh's src",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	viewportFit: "cover",
};

export default function SmallGalleryLayout({ children }: PropsWithChildren) {
	return (
		<section className="absolute top-0 left-0 z-50 flex min-h-svh w-svw flex-col items-center justify-start">
			<Back className="absolute top-1 right-1" iconClassName="text-white" />
			{children}
		</section>
	);
}
