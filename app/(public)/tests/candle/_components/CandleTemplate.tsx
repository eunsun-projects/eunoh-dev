"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Back } from "@/app/(public)/_components/ui";
import CandleScene from "./CandleScene";

export default function CandleTemplate() {
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		// Set initial dimensions
		const updateDimensions = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		updateDimensions();

		// Update on resize
		const handleResize = () => {
			updateDimensions();
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	if (dimensions.width === 0 || dimensions.height === 0) {
		return null;
	}

	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				background: "linear-gradient(to bottom, #0a0a0a 0%, #1a1a2e 100%)",
				overflow: "hidden",
				position: "fixed",
				top: 0,
				left: 0,
				zIndex: 1000,
			}}
		>
			<Back className="absolute top-4 right-4 z-[1001]" />
			<Canvas
				camera={{ position: [0, 7, 5], fov: 50 }}
				style={{ width: dimensions.width, height: dimensions.height }}
				gl={{ antialias: true, alpha: false }}
			>
				<CandleScene />
				<OrbitControls
					enableZoom={true}
					enablePan={false}
					minDistance={3}
					maxDistance={8}
					minPolarAngle={Math.PI / 4}
					maxPolarAngle={Math.PI / 2}
					target={[0, 1.9, 0]}
				/>
			</Canvas>
		</div>
	);
}
