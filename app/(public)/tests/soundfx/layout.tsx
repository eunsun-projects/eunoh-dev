import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: "SoundFX",
	description: "SoundFX",
};

export default function SoundfxLayout({ children }: PropsWithChildren) {
	return (
		<section className="fixed top-0 left-0 z-50 h-dvh w-dvw bg-neutral-400">
			{children}
		</section>
	);
}
