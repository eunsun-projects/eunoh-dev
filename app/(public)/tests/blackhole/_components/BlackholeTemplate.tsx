"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { Back } from "@/app/(public)/_components/ui";
import BlackholeBloomEffect from "./BlackholeBloomEffect";
import BlackholeScene from "./BlackholeScene";

export default function BlackholeTemplate() {
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const updateDimensions = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		updateDimensions();
		window.addEventListener("resize", updateDimensions);

		return () => {
			window.removeEventListener("resize", updateDimensions);
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
				background: "#000000",
				overflow: "hidden",
				position: "fixed",
				top: 0,
				left: 0,
				zIndex: 1000,
			}}
		>
			<Back className="absolute top-4 right-4 z-[1001]" />

			<Canvas
				camera={{ position: [3, 1.5, 8], fov: 60 }}
				style={{ width: dimensions.width, height: dimensions.height }}
				gl={{
					antialias: true,
					alpha: false,
					powerPreference: "high-performance",
					toneMapping: THREE.ACESFilmicToneMapping,
					toneMappingExposure: 1.2,
				}}
			>
				<BlackholeScene />
				<BlackholeBloomEffect />
				<OrbitControls
					enableZoom={true}
					enablePan={false}
					minDistance={12}
					maxDistance={18}
					target={[0, 0, 0]}
				/>
			</Canvas>
		</div>
	);
}
