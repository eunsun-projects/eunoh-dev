import type { Metadata, Viewport } from "next";

import BlackholeRetryTemplate from "./_components/BlackholeRetryTemplate";

export const metadata: Metadata = {
	title: "WebGPU Black Hole (Retry)",
	description:
		"WebGPU + WGSL full-screen quad black hole simulation with accretion disk and camera controls.",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	viewportFit: "cover",
};

export default function BlackholeRetryPage() {
	return <BlackholeRetryTemplate />;
}
