"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

interface FireworkProps {
  position: [number, number, number];
}
const colors = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
];

export default function Firework({ position }: FireworkProps) {
  const [sparks, setSparks] = useState<
    {
      direction: THREE.Vector3;
      speed: number;
      color: string;
      mesh: THREE.Mesh | null;
    }[]
  >([]);

  useEffect(() => {
    const newSparks = [];
    for (let i = 0; i < 50; i++) {
      const speed = Math.random() * 0.02 + 0.1;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const direction = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi),
      );
      const color = colors[Math.floor(Math.random() * colors.length)];
      newSparks.push({ direction, speed, color, mesh: null });
    }
    setSparks(newSparks);
  }, []);

  useFrame((state, delta) => {
    sparks.forEach((spark) => {
      spark.mesh?.position.add(
        spark.direction.clone().multiplyScalar(spark.speed),
      );
    });
  });

  return (
    <>
      {sparks.length > 0 &&
        sparks.map((spark, index) => (
          <mesh
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            position={position}
            ref={(mesh) => {
              if (mesh) spark.mesh = mesh;
            }}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshPhongMaterial
              color={spark.color}
              emissive={spark.color}
              emissiveIntensity={1}
            />
          </mesh>
        ))}
    </>
  );
}
