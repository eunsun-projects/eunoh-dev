"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

// GLSL Shader for Accretion Disk
const AccretionDiskMaterial = shaderMaterial(
	{
		uTime: 0,
		uInnerRadius: 1.35,
		uOuterRadius: 3.2,
		uRotationSpeed: 1.0,
		uBrightness: 1.2,
		uColorShift: 0.35,
	},
	// Vertex Shader
	`
		varying vec2 vUv;
		varying vec3 vPosition;
		varying float vDistance;
		
		void main() {
			vUv = uv;
			vPosition = position;
			vDistance = length(position.xz);
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`,
	// Fragment Shader
	`
		uniform float uTime;
		uniform float uInnerRadius;
		uniform float uOuterRadius;
		uniform float uRotationSpeed;
		uniform float uBrightness;
		uniform float uColorShift;
		
		varying vec2 vUv;
		varying vec3 vPosition;
		varying float vDistance;
		
		// Simplex noise for turbulence
		vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
		vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
		vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
		
		float snoise(vec2 v) {
			const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
			vec2 i = floor(v + dot(v, C.yy));
			vec2 x0 = v - i + dot(i, C.xx);
			vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
			vec4 x12 = x0.xyxy + C.xxzz;
			x12.xy -= i1;
			i = mod289(i);
			vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
			vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
			m = m*m;
			m = m*m;
			vec3 x = 2.0 * fract(p * C.www) - 1.0;
			vec3 h = abs(x) - 0.5;
			vec3 ox = floor(x + 0.5);
			vec3 a0 = x - ox;
			m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
			vec3 g;
			g.x = a0.x * x0.x + h.x * x0.y;
			g.yz = a0.yz * x12.xz + h.yz * x12.yw;
			return 130.0 * dot(m, g);
		}
		
		void main() {
			float dist = vDistance;
			
			// Disk boundaries
			if (dist < uInnerRadius || dist > uOuterRadius) {
				discard;
			}
			
			// Angular position
			float angle = atan(vPosition.z, vPosition.x);
			float rotatedAngle = angle + uTime * uRotationSpeed / dist; // Faster rotation closer to center
			
			// Radial falloff
			float innerFade = smoothstep(uInnerRadius, uInnerRadius + 0.3, dist);
			float outerFade = 1.0 - smoothstep(uOuterRadius - 0.5, uOuterRadius, dist);
			float radialIntensity = innerFade * outerFade;
			
			// Spiral structure with turbulence
			float spiral = 0.5 + 0.5 * sin(rotatedAngle * 1.5 - dist * 1.0 + uTime * 1.0);
			float turbulence = snoise(vec2(rotatedAngle * 1.5, dist * 0.4 + uTime * 0.4)) * 0.15;
			float pattern = spiral + turbulence;
			
			// Temperature gradient (hotter closer to black hole)
			float temperature = 1.0 - (dist - uInnerRadius) / (uOuterRadius - uInnerRadius);
			temperature = pow(temperature, 1.5);
			
			// Doppler effect - blueshifted on one side, redshifted on the other
			float dopplerShift = sin(angle) * uColorShift * (1.0 - dist / uOuterRadius);
			
			// Color based on temperature and doppler effect
			vec3 coolColor = vec3(0.8, 0.3, 0.1); // Reddish
			vec3 hotColor = vec3(1.0, 0.9, 0.7);  // Yellowish-white
			vec3 ultraHotColor = vec3(0.7, 0.8, 1.0); // Bluish-white
			
			vec3 color;
			if (temperature < 0.5) {
				color = mix(coolColor, hotColor, temperature * 2.0);
			} else {
				color = mix(hotColor, ultraHotColor, (temperature - 0.5) * 2.0);
			}
			
			// Apply doppler shift
			color.r *= 1.0 - dopplerShift * 0.3;
			color.b *= 1.0 + dopplerShift * 0.3;
			
			// Brightness variations
			float brightness = pattern * radialIntensity * temperature * uBrightness;
			brightness *= (1.0 + snoise(vec2(dist * 2.0, rotatedAngle * 3.0 + uTime)) * 0.2);
			
			// Hot spots
			float hotSpot = pow(max(0.0, snoise(vec2(rotatedAngle * 5.0, dist + uTime * 0.3))), 3.0);
			brightness += hotSpot * 0.5 * radialIntensity;
			brightness = min(brightness, 1.0);

			// Final color
			color *= brightness;
			color = clamp(color, 0.0, 1.0);

			// Add subtle glow
			color += vec3(1.0, 0.8, 0.4) * pow(brightness, 2.0) * 0.18;

			gl_FragColor = vec4(color, radialIntensity * 0.95);
		}
	`,
);

extend({ AccretionDiskMaterial });

export function AccretionDisk() {
	const diskRef = useRef<THREE.Mesh>(null);
	const materialRef = useRef<any>(null);

	useFrame((state) => {
		const time = state.clock.getElapsedTime();

		if (materialRef.current) {
			materialRef.current.uTime = time;
			// Pulsating brightness
			materialRef.current.uBrightness = 2.0 + Math.sin(time * 0.5) * 0.3;
		}

		if (diskRef.current) {
			// Very subtle wobble
			diskRef.current.rotation.x = Math.sin(time * 0.3) * 0.02;
			diskRef.current.rotation.z = Math.cos(time * 0.2) * 0.02;
		}
	});

	return (
		<group>
			{/* Horizontal static rings - multiple layers for thickness */}
			{[-0.15, -0.05, 0].map((yOffset, _i) => (
				<group key={yOffset.toString()}>
					<mesh rotation={[0, Math.PI / 2, 0]} position={[0, yOffset, 0]}>
						<torusGeometry args={[2.5, 0.6, 24, 100]} />
						{/* @ts-ignore */}
						<accretionDiskMaterial
							color="#ffddaa"
							transparent
							opacity={0.3 * (1 - Math.abs(yOffset) * 2)}
							blending={THREE.AdditiveBlending}
						/>
					</mesh>
					<mesh
						ref={materialRef}
						rotation={[Math.PI / 2, 0, 0]}
						position={[0, yOffset, 0]}
					>
						<torusGeometry args={[2.5, 0.6, 24, 100]} />
						{/* @ts-ignore */}
						<accretionDiskMaterial
							color="#ffddaa"
							transparent
							opacity={0.3 * (1 - Math.abs(yOffset) * 2)}
							blending={THREE.AdditiveBlending}
						/>
					</mesh>

					<mesh
						ref={diskRef}
						rotation={[0, Math.PI / 2, 0]}
						position={[0, yOffset, 0]}
					>
						<torusGeometry args={[3.6, 0.6, 24, 100]} />
						<meshBasicMaterial
							color="#ffddaa"
							transparent
							opacity={0.3 * (1 - Math.abs(yOffset) * 2)}
							blending={THREE.AdditiveBlending}
						/>
					</mesh>

					<mesh rotation={[Math.PI / 2, 0, 0]} position={[0, yOffset, 0]}>
						<torusGeometry args={[3.6, 0.6, 24, 100]} />
						<meshBasicMaterial
							color="#ffddaa"
							transparent
							opacity={0.3 * (1 - Math.abs(yOffset) * 2)}
							blending={THREE.AdditiveBlending}
						/>
					</mesh>

					{/* Glow effect */}
					<mesh position={[0, 0, 0]} scale={[1, 1, 1]}>
						<sphereGeometry args={[2, 32, 32]} />
						<meshBasicMaterial
							color="#ff8800"
							transparent
							opacity={0.1 * (1 - Math.abs(yOffset) * 1)}
							blending={THREE.AdditiveBlending}
						/>
					</mesh>
				</group>
			))}
		</group>
	);
}
