"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Candle() {
  return (
    <group position={[0, 0, 0]}>
      {/* Candle body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.32, 2, 32]} />
        <meshStandardMaterial color="#f5f5dc" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Candle top */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
        <meshStandardMaterial
          color="#f0f0d0"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Wick */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.02, 0.4, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Flame() {
  const flameRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const outerFlameRef = useRef<THREE.Mesh>(null);
  const middleFlameRef = useRef<THREE.Mesh>(null);
  const innerFlameRef = useRef<THREE.Mesh>(null);
  const coreFlameRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (flameRef.current) {
      // Realistic flame movement
      const flicker = Math.sin(time * 8) * 0.02 + Math.sin(time * 15) * 0.01;
      const sway = Math.sin(time * 2) * 0.03;

      flameRef.current.position.x = sway;
      flameRef.current.position.y = 1.9 + flicker;
      flameRef.current.scale.y = 1 + flicker * 2;
    }

    if (lightRef.current) {
      // Flickering light intensity
      const intensity =
        1.5 + Math.sin(time * 8) * 0.3 + Math.sin(time * 15) * 0.15;
      lightRef.current.intensity = intensity;
    }

    // Animate each flame layer independently for more realism
    if (outerFlameRef.current) {
      outerFlameRef.current.scale.x = 1 + Math.sin(time * 10) * 0.1;
      outerFlameRef.current.scale.z = 1 + Math.cos(time * 10) * 0.1;
    }

    if (middleFlameRef.current) {
      middleFlameRef.current.scale.x = 1 + Math.sin(time * 12 + 1) * 0.15;
      middleFlameRef.current.scale.z = 1 + Math.cos(time * 12 + 1) * 0.15;
    }

    if (innerFlameRef.current) {
      innerFlameRef.current.scale.x = 1 + Math.sin(time * 15 + 2) * 0.2;
      innerFlameRef.current.scale.z = 1 + Math.cos(time * 15 + 2) * 0.2;
    }

    if (coreFlameRef.current) {
      coreFlameRef.current.scale.setScalar(1 + Math.sin(time * 20) * 0.3);
    }
  });

  return (
    <group ref={flameRef} position={[0, 1.9, 0]}>
      {/* Outer flame layer - red/orange */}
      <mesh ref={outerFlameRef} scale={[0.8, 1.4, 0.8]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial
          color="#ff3300"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Middle flame layer - orange */}
      <mesh
        ref={middleFlameRef}
        scale={[0.65, 1.2, 0.65]}
        position={[0, 0.02, 0]}
      >
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner flame layer - yellow-orange */}
      <mesh ref={innerFlameRef} scale={[0.5, 1.0, 0.5]} position={[0, 0.04, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial
          color="#ffaa00"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Core flame - bright yellow/white */}
      <mesh
        ref={coreFlameRef}
        scale={[0.35, 0.7, 0.35]}
        position={[0, 0.06, 0]}
      >
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial
          color="#ffffaa"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Flame tip - white hot */}
      <mesh scale={[0.15, 0.3, 0.15]} position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Point light for illumination */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}
        color="#ff8844"
        intensity={1.5}
        distance={5}
        decay={2}
        castShadow
      />
    </group>
  );
}

function Sparks() {
  const particlesRef = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);

  const particleCount = 20;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Start near flame
      positions[i3] = (Math.random() - 0.5) * 0.1; // x
      positions[i3 + 1] = 1.9 + Math.random() * 0.2; // y
      positions[i3 + 2] = (Math.random() - 0.5) * 0.1; // z

      // Velocity
      velocities[i3] = (Math.random() - 0.5) * 0.01; // x
      velocities[i3 + 1] = Math.random() * 0.02 + 0.01; // y (upward)
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01; // z

      // Orange to yellow colors
      colors[i3] = 1; // r
      colors[i3 + 1] = 0.6 + Math.random() * 0.4; // g
      colors[i3 + 2] = 0; // b
    }

    velocitiesRef.current = velocities;

    return { positions, colors };
  }, []);

  useFrame(() => {
    if (!particlesRef.current || !velocitiesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position
      .array as Float32Array;
    const velocities = velocitiesRef.current;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Update positions
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      // Reset particle if too high
      if (positions[i3 + 1] > 2.5) {
        positions[i3] = (Math.random() - 0.5) * 0.1;
        positions[i3 + 1] = 1.9;
        positions[i3 + 2] = (Math.random() - 0.5) * 0.1;

        velocities[i3] = (Math.random() - 0.5) * 0.01;
        velocities[i3 + 1] = Math.random() * 0.02 + 0.01;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
      }

      // Add slight turbulence
      velocities[i3] += (Math.random() - 0.5) * 0.0005;
      velocities[i3 + 2] += (Math.random() - 0.5) * 0.0005;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
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
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function CandleScene() {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.1} />

      {/* Candle */}
      <Candle />

      {/* Flame */}
      <Flame />

      {/* Sparks */}
      <Sparks />

      {/* Ground plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
    </>
  );
}
