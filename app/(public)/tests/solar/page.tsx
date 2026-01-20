import type { Metadata, Viewport } from "next";
import SolarTemplate from "./_components/solar-template";

export const metadata: Metadata = {
	title: "Solar System",
	description: "Solar system visualization with realistic orbits and physics",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	viewportFit: "cover",
};

function SolarPage() {
	return <SolarTemplate />;
}

export default SolarPage;
