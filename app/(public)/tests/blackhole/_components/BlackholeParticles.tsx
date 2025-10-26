"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export function BlackholeParticles() {
	const particlesRef = useRef<THREE.Points>(null);
	const particleCount = 1000;

	const { positions, colors, radii, angles, speeds } = useMemo(() => {
		const positions = new Float32Array(particleCount * 3);
		const colors = new Float32Array(particleCount * 3);
		const velocities = new Float32Array(particleCount * 3);
		const radii = new Float32Array(particleCount);
		const angles = new Float32Array(particleCount);
		const speeds = new Float32Array(particleCount);

		for (let i = 0; i < particleCount; i++) {
			const i3 = i * 3;

			// Random radius from black hole (between inner and outer accretion disk)
			const radius = 1.5 + Math.random() * 3.5;
			radii[i] = radius;

			// Random angle
			const angle = Math.random() * Math.PI * 2;
			angles[i] = angle;

			// Orbital speed (faster closer to black hole)
			speeds[i] = 0.5 / radius + Math.random() * 0.2;

			// Initial position
			positions[i3] = Math.cos(angle) * radius;
			positions[i3 + 1] = (Math.random() - 0.5) * 0.5; // Slight vertical spread
			positions[i3 + 2] = Math.sin(angle) * radius;

			// Initial velocity (orbital)
			const orbitalSpeed = speeds[i];
			velocities[i3] = -Math.sin(angle) * orbitalSpeed;
			velocities[i3 + 1] = 0;
			velocities[i3 + 2] = Math.cos(angle) * orbitalSpeed;

			// Color based on temperature/distance
			const temp = 1.0 - (radius - 1.5) / 3.5;
			if (temp > 0.7) {
				// Hot - bluish white
				colors[i3] = 0.7 + Math.random() * 0.3;
				colors[i3 + 1] = 0.8 + Math.random() * 0.2;
				colors[i3 + 2] = 1.0;
			} else if (temp > 0.4) {
				// Medium - yellowish
				colors[i3] = 1.0;
				colors[i3 + 1] = 0.8 + Math.random() * 0.2;
				colors[i3 + 2] = 0.3 + Math.random() * 0.3;
			} else {
				// Cool - reddish
				colors[i3] = 1.0;
				colors[i3 + 1] = 0.3 + Math.random() * 0.3;
				colors[i3 + 2] = 0.1 + Math.random() * 0.2;
			}
		}

		return { positions, colors, velocities, radii, angles, speeds };
	}, []);

	useFrame((state) => {
		if (!particlesRef.current) return;

		const time = state.clock.getElapsedTime();
		const positionsArray = particlesRef.current.geometry.attributes.position
			.array as Float32Array;

		for (let i = 0; i < particleCount; i++) {
			const i3 = i * 3;
			const radius = radii[i];

			// Update angle based on orbital speed
			angles[i] += speeds[i] * 0.02;

			// Add some turbulence
			const turbulence = Math.sin(time * 2 + i) * 0.01;
			const currentRadius = radius + Math.sin(time * 0.5 + i * 0.1) * 0.1;

			// Spiral inward slowly
			radii[i] *= 0.9995;

			// Update position
			positionsArray[i3] = Math.cos(angles[i] + turbulence) * currentRadius;
			positionsArray[i3 + 1] = Math.sin(time * 3 + i * 0.01) * 0.2; // Vertical oscillation
			positionsArray[i3 + 2] = Math.sin(angles[i] + turbulence) * currentRadius;

			// Reset particle if it gets too close to black hole
			if (radii[i] < 1.2) {
				radii[i] = 4.0 + Math.random() * 1.0;
				angles[i] = Math.random() * Math.PI * 2;
				speeds[i] = 0.5 / radii[i] + Math.random() * 0.2;
			}
		}

		particlesRef.current.geometry.attributes.position.needsUpdate = true;
		particlesRef.current.rotation.y = time * 0.01;
	});

	return (
		<>
			{/* Main particle system */}
			<points ref={particlesRef}>
				<bufferGeometry>
					<bufferAttribute
						attach="attributes-position"
						count={particleCount}
						array={positions}
						itemSize={3}
						args={[positions, 3]}
					/>
					<bufferAttribute
						attach="attributes-color"
						count={particleCount}
						array={colors}
						itemSize={3}
						args={[colors, 3]}
					/>
				</bufferGeometry>
				<pointsMaterial
					size={0.02}
					vertexColors
					transparent
					opacity={0.8}
					blending={THREE.AdditiveBlending}
					sizeAttenuation={true}
					depthWrite={false}
				/>
			</points>

			{/* Dust cloud particles */}
			<DustCloud />
		</>
	);
}

function DustCloud() {
	const dustRef = useRef<THREE.Points>(null);
	const dustCount = 500;

	const positions = useMemo(() => {
		const positions = new Float32Array(dustCount * 3);

		for (let i = 0; i < dustCount; i++) {
			const i3 = i * 3;
			const radius = 2.0 + Math.random() * 4.0;
			const angle = Math.random() * Math.PI * 2;
			const height = (Math.random() - 0.5) * 2;

			positions[i3] = Math.cos(angle) * radius;
			positions[i3 + 1] = height;
			positions[i3 + 2] = Math.sin(angle) * radius;
		}

		return positions;
	}, []);

	useFrame((state) => {
		if (dustRef.current) {
			dustRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
			dustRef.current.rotation.x =
				Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
		}
	});

	return (
		<points ref={dustRef}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					count={dustCount}
					array={positions}
					itemSize={3}
					args={[positions, 3]}
				/>
			</bufferGeometry>
			<pointsMaterial
				size={0.05}
				color="#ff8844"
				transparent
				opacity={0.2}
				blending={THREE.AdditiveBlending}
				sizeAttenuation={true}
				fog={false}
			/>
		</points>
	);
}
