"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";
import { AccretionDisk } from "./AccretionDisk";

export default function BlackholeScene() {
	const isMobile = useIsMobile();
	const { camera } = useThree();

	useEffect(() => {
		if (isMobile) {
			camera.position.set(-12, 12, 10);
		} else {
			camera.position.set(-3, 3, 2);
		}
		camera.lookAt(0, 0, 0);
	}, [camera, isMobile]);

	return (
		<>
			<ambientLight intensity={0.1} />

			{/* Enhanced star background */}
			<StarfieldSphere />

			{/* Celestial bodies for lensing demo */}
			<DistantStars />

			{/* Accretion disk */}
			<AccretionDisk />

			{/* Event horizon (black sphere) */}
			<mesh position={[0, 0, 0]} renderOrder={999}>
				<sphereGeometry args={[2.2, 64, 64]} />
				<meshBasicMaterial
					color="#000000"
					toneMapped={false}
					depthWrite={true}
					depthTest={true}
				/>
			</mesh>
		</>
	);
}

// High-quality starfield sphere
function StarfieldSphere() {
	const starfieldRef = useRef<THREE.Mesh>(null);

	const texture = useMemo(() => {
		const canvas = document.createElement("canvas");
		canvas.width = 2048;
		canvas.height = 1024;
		const ctx = canvas.getContext("2d")!;

		// Black background
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Add stars
		const starCount = 8000;
		for (let i = 0; i < starCount; i++) {
			const x = Math.random() * canvas.width;
			const y = Math.random() * canvas.height;
			const size = Math.random() * 2;
			const brightness = Math.random();

			ctx.beginPath();
			ctx.arc(x, y, size, 0, Math.PI * 2);

			// Color variation
			const temp = Math.random();
			if (temp < 0.3) {
				ctx.fillStyle = `rgba(255, ${200 + Math.floor(brightness * 55)}, ${
					180 + Math.floor(brightness * 75)
				}, ${brightness})`;
			} else if (temp < 0.6) {
				ctx.fillStyle = `rgba(255, 255, ${220 + Math.floor(brightness * 35)}, ${brightness})`;
			} else {
				ctx.fillStyle = `rgba(${180 + Math.floor(brightness * 75)}, ${
					200 + Math.floor(brightness * 55)
				}, 255, ${brightness})`;
			}

			ctx.fill();
		}

		// Add milky way band
		const gradient = ctx.createLinearGradient(
			0,
			canvas.height * 0.3,
			0,
			canvas.height * 0.7,
		);
		gradient.addColorStop(0, "rgba(200, 200, 255, 0)");
		gradient.addColorStop(0.5, "rgba(200, 200, 255, 0.05)");
		gradient.addColorStop(1, "rgba(200, 200, 255, 0)");
		ctx.fillStyle = gradient;
		ctx.fillRect(0, canvas.height * 0.3, canvas.width, canvas.height * 0.4);

		const tex = new THREE.CanvasTexture(canvas);
		tex.needsUpdate = true;
		return tex;
	}, []);

	useFrame(() => {
		if (starfieldRef.current) {
			starfieldRef.current.rotation.y += 0.00005;
		}
	});

	return (
		<mesh ref={starfieldRef} scale={[80, 80, 80]}>
			<sphereGeometry args={[1, 64, 64]} />
			<meshBasicMaterial map={texture} side={THREE.BackSide} />
		</mesh>
	);
}

// Distant stars for gravitational lensing demonstration
function DistantStars() {
	const starsRef = useRef<THREE.Group>(null);

	const stars = useMemo(() => {
		const starData = [];
		const count = 50;

		for (let i = 0; i < count; i++) {
			const radius = 25 + Math.random() * 20;
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.random() * Math.PI;

			const x = radius * Math.sin(phi) * Math.cos(theta);
			const y = radius * Math.sin(phi) * Math.sin(theta);
			const z = radius * Math.cos(phi);

			const size = 0.1 + Math.random() * 0.15;
			const color =
				Math.random() < 0.5
					? "#ffffee"
					: Math.random() < 0.5
						? "#eeeeff"
						: "#ffeeee";
			const brightness = 0.6 + Math.random() * 0.4;

			starData.push({ position: [x, y, z], size, color, brightness });
		}

		return starData;
	}, []);

	useFrame(() => {
		if (starsRef.current) {
			starsRef.current.rotation.y += 0.0001;
		}
	});

	return (
		<group ref={starsRef}>
			{stars.map((star, i) => (
				<mesh key={i} position={star.position as [number, number, number]}>
					<sphereGeometry args={[star.size, 16, 16]} />
					<meshBasicMaterial
						color={star.color}
						transparent
						opacity={star.brightness}
						toneMapped={false}
					/>
				</mesh>
			))}
		</group>
	);
}
