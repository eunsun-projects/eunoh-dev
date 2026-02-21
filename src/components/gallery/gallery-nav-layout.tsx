"use client";

import Link from "next/link";
import type { PropsWithChildren } from "react";
import { IoClose, IoHome, IoPause } from "react-icons/io5";
import { cn } from "@/lib/utils";
import GalleryCaption from "./gallery-caption";
import GalleryIntro from "./gallery-intro";
import { useGallery } from "./gallery-loading-context";

interface GalleryNavHelpLayoutProps {
	href: string;
	title: string;
	minCount: number;
}

function GalleryNavHelpLayout({
	children,
	href,
	title,
	minCount,
}: PropsWithChildren<GalleryNavHelpLayoutProps>) {
	const { isPaused, pauseActions, isInfoOpen } = useGallery();

	return (
		<div>
			<div
				className={cn(
					"absolute inset-0 z-1005 backdrop-blur-xs",
					isPaused ? "blockpointer-events-none touch-none" : "hidden",
				)}
			/>
			<div className="fixed top-0 left-0 z-1006 flex flex-row gap-1 text-white">
				<button
					type="button"
					className="flex h-6 w-6 cursor-pointer items-center justify-center border-2 border-white bg-slate-300/40 backdrop-blur-sm"
					onClick={isPaused ? pauseActions.setUnpaused : pauseActions.setPaused}
				>
					<IoPause className="text-2xl" />
				</button>
				<Link href={href} className="text-white">
					<div className="flex h-6 w-6 cursor-pointer items-center justify-center border-2 border-white bg-slate-300/40 backdrop-blur-sm">
						<IoClose className="text-2xl" />
					</div>
				</Link>
				<Link href={"/"} className="text-white">
					<div className="flex h-6 w-6 cursor-pointer items-center justify-center border-2 border-white bg-slate-300/40 backdrop-blur-sm">
						<IoHome className="text-2xl" />
					</div>
				</Link>
			</div>
			<GalleryIntro title={title} minCount={minCount} />
			{children}
			{isInfoOpen.open && <GalleryCaption isInfoOpen={isInfoOpen} />}
		</div>
	);
}
export default GalleryNavHelpLayout;
