import type { Metadata, Viewport } from "next";
import BlackholeTemplate from "./_components/BlackholeTemplate";

export const metadata: Metadata = {
	title: "Relativistic Black Hole",
	description:
		"Physically accurate black hole visualization with geodesic ray tracing, Lorentz transformation, Doppler shift, and gravitational lensing effects",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	viewportFit: "cover",
};

export default function BlackholePage() {
	return <BlackholeTemplate />;
}
