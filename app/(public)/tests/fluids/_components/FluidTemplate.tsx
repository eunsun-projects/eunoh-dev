"use client";

import { useEffect } from "react";
import { Back } from "@/app/(public)/_components/ui";
import FluidCanvas from "./FluidCanvas";

export default function FluidTemplate() {
	useEffect(() => {
		const setVh = () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		};
		setVh();
		window.addEventListener("resize", setVh);
		return () => window.removeEventListener("resize", setVh);
	}, []);

	return (
		<div
			style={{
				width: "100vw",
				height: "100dvh",
				touchAction: "none",
				background: "#0a0a0a",
				position: "fixed",
				top: 0,
				left: 0,
				zIndex: 1000,
			}}
		>
			<Back className="absolute top-4 right-4" />
			<FluidCanvas />
		</div>
	);
}
