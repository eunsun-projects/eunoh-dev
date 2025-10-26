import type { Metadata, Viewport } from "next";
import CandleTemplate from "./_components/CandleTemplate";

export const metadata: Metadata = {
	title: "Candle",
	description: "Realistic animated candle with Three.js",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	viewportFit: "cover",
};

export default function CandlePage() {
	return <CandleTemplate />;
}
