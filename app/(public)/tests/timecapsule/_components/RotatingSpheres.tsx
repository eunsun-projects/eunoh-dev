'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import EachSphere from './EachSphere';

interface RotatingSpheresProps {
  count: number;
}

function RotatingSpheres({ count }: RotatingSpheresProps) {
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const generateRandom = () => {
      const value = Math.random() * 20 - 10; // -10 ~ 10 범위 생성
      if (value > -2 && value < 2) {
        // 중앙부(-2 ~ 2)에 속하면 재생성
        return generateRandom();
      }
      return value;
    };

    return Array.from({ length: count }, () => [
      generateRandom(), // X 좌표
      generateRandom(), // Y 좌표
      generateRandom(), // Z 좌표
    ]);
  }, [count]);

  const colors = useMemo(() => {
    return Array.from(
      { length: count },
      () =>
        new THREE.Color(
          `hsl(${Math.random() * 360}, ${50 + Math.random() * 45}%, ${70 + Math.random() * 20}%)`,
        ),
    );
  }, [count]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01 * delta; // 속도 조절
    }
  });

  return (
    <group ref={groupRef}>
      {positions.map((position, index) => (
        <EachSphere key={index} position={position} color={colors[index]} />
      ))}
    </group>
  );
}

export default RotatingSpheres;
