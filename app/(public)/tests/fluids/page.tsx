import type { Metadata, Viewport } from "next";
import FluidTemplate from "./_components/FluidTemplate";

export const metadata: Metadata = {
	title: "Fluids",
	description: "2D Eulerian Fluid Simulation",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	viewportFit: "cover",
};

export default function FluidsPage() {
	return <FluidTemplate />;
}
