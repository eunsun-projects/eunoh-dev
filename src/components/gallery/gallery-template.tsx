"use client";

import { useEffect } from "react";
import GalleryCanvas from "./gallery-canvas";
import { GalleryProvider } from "./gallery-loading-context";
import GalleryNavHelpLayout from "./gallery-nav-layout";

interface GalleryTemplateProps {
	title: string;
	minCount: number;
}

function GalleryTemplate({ title, minCount }: GalleryTemplateProps) {
	useEffect(() => {
		/** ============ set screensize =============== */
		function setScreenSize() {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		}

		/** ====== Generate a resize event if the device doesn't do it ====== */
		window.addEventListener(
			"orientationchange",
			() => window.dispatchEvent(new Event("resize")),
			false,
		);
		window.addEventListener("resize", setScreenSize);
		window.dispatchEvent(new Event("resize"));

		return () => {
			window.removeEventListener(
				"orientationchange",
				() => window.dispatchEvent(new Event("resize")),
				false,
			);
			window.removeEventListener("resize", setScreenSize);
		};
	}, []);

	return (
		<GalleryProvider>
			<div className="absolute inset-0 z-1005 hidden h-svh w-svw bg-slate-500/20 text-[1.6em] backdrop-blur-sm">
				<h3 className="text-center font-semibold text-[2em] text-white">
					Looks good in portrait mode!
				</h3>
			</div>

			<div className="h-[calc(var(--vh,1vh)*100)] w-svw touch-none overflow-hidden">
				<GalleryNavHelpLayout href="/tests" title={title} minCount={minCount}>
					<GalleryCanvas title={title} />
				</GalleryNavHelpLayout>
			</div>
		</GalleryProvider>
	);
}
export default GalleryTemplate;
