"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

// Gravitational Lensing Shader
const GravitationalLensingMaterial = shaderMaterial(
	{
		uTime: 0,
		uDistortion: 0.5,
		uRadius: 1.2,
	},
	// Vertex Shader
	`
		varying vec2 vUv;
		varying vec3 vPosition;
		
		void main() {
			vUv = uv;
			vPosition = position;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`,
	// Fragment Shader
	`
		uniform float uTime;
		uniform float uDistortion;
		uniform float uRadius;
		
		varying vec2 vUv;
		varying vec3 vPosition;
		
		void main() {
			// Distance from center
			vec2 center = vec2(0.5);
			vec2 uv = vUv - center;
			float dist = length(uv);
			
			// Create distortion effect
			float distortionAmount = 1.0 / (dist * 10.0 + 1.0) * uDistortion;
			vec2 distortedUv = uv * (1.0 - distortionAmount) + center;
			
			// Angular distortion for swirling effect
			float angle = atan(uv.y, uv.x);
			float swirl = sin(angle * 3.0 + uTime * 0.5) * 0.1 * (1.0 - dist);
			
			// Color based on distortion
			vec3 color = vec3(0.0);
			
			// Light bending effect - create rings
			float ring1 = smoothstep(0.2, 0.25, dist) - smoothstep(0.35, 0.4, dist);
			float ring2 = smoothstep(0.4, 0.45, dist) - smoothstep(0.55, 0.6, dist);
			float ring3 = smoothstep(0.6, 0.65, dist) - smoothstep(0.75, 0.8, dist);
			
			float rings = ring1 * 0.3 + ring2 * 0.2 + ring3 * 0.1;
			rings *= (1.0 + sin(angle * 8.0 + uTime * 2.0) * 0.2);
			
			// Photon sphere effect
			float photonSphere = exp(-pow(dist - 0.3, 2.0) * 50.0);
			photonSphere *= (1.0 + sin(angle * 16.0 - uTime * 3.0) * 0.3);
			
			// Combine effects
			float intensity = rings + photonSphere * 0.5 + swirl;
			
			// Bluish tint for light bending
			color = vec3(0.6, 0.8, 1.0) * intensity * 0.5;
			
			// Fade out at edges
			float alpha = (1.0 - smoothstep(0.0, 1.0, dist)) * 0.3;
			
			gl_FragColor = vec4(color, alpha * intensity);
		}
	`,
);

extend({ GravitationalLensingMaterial });

export function GravitationalLensing() {
	const lensRef = useRef<THREE.Mesh>(null);
	const materialRef = useRef<any>(null);
	const photonRingRef = useRef<THREE.Mesh>(null);

	useFrame((state) => {
		const time = state.clock.getElapsedTime();

		if (materialRef.current) {
			materialRef.current.uTime = time;
			materialRef.current.uDistortion = 0.5 + Math.sin(time * 0.5) * 0.1;
		}

		if (lensRef.current) {
			lensRef.current.rotation.z = time * 0.05;
		}

		if (photonRingRef.current) {
			photonRingRef.current.rotation.z = -time * 0.8;
			const scale = 1 + Math.sin(time * 3) * 0.05;
			photonRingRef.current.scale.setScalar(scale);
		}
	});

	return (
		<group>
			{/* Gravitational lensing plane */}
			<mesh ref={lensRef} position={[0, 0, 0.1]}>
				<planeGeometry args={[8, 8, 64, 64]} />
				{/* @ts-ignore */}
				<gravitationalLensingMaterial
					ref={materialRef}
					transparent
					side={THREE.DoubleSide}
					blending={THREE.AdditiveBlending}
					depthWrite={false}
				/>
			</mesh>

			{/* Photon ring - bright ring around black hole */}
			<mesh ref={photonRingRef} position={[0, 0, 0]}>
				<torusGeometry args={[1.35, 0.02, 8, 100]} />
				<meshBasicMaterial
					color="#88ccff"
					transparent
					opacity={0.8}
					blending={THREE.AdditiveBlending}
				/>
			</mesh>

			{/* Secondary photon ring */}
			<mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
				<torusGeometry args={[1.35, 0.02, 8, 100]} />
				<meshBasicMaterial
					color="#aaddff"
					transparent
					opacity={0.6}
					blending={THREE.AdditiveBlending}
				/>
			</mesh>

			{/* Einstein ring effect */}
			<mesh position={[0, 0, -0.1]}>
				<ringGeometry args={[1.3, 1.4, 64]} />
				<meshBasicMaterial
					color="#6699ff"
					transparent
					opacity={0.3}
					side={THREE.DoubleSide}
					blending={THREE.AdditiveBlending}
				/>
			</mesh>
		</group>
	);
}
