'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useTimeCapsuleStore } from '../_libs/zustand';
import EachSphere from './EachSphere';

function RotatingSpheres() {
  const { timeCapsules } = useTimeCapsuleStore();
  const groupRef = useRef<THREE.Group>(null);

  // const positions = useMemo(() => {
  //   return Array.from({ length: timeCapsules?.length || 10 }, () => [
  //     generateRandomPosition(), // X 좌표
  //     generateRandomPosition(), // Y 좌표
  //     generateRandomPosition(), // Z 좌표
  //   ]);
  // }, [timeCapsules]);

  // const colors = useMemo(() => {
  //   return Array.from({ length: timeCapsules?.length || 10 }, () => generateColor());
  // }, [timeCapsules]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01 * delta; // 속도 조절
    }
  });

  return (
    <group ref={groupRef}>
      {timeCapsules.map((timeCapsule, index) => (
        <EachSphere key={index} timeCapsule={timeCapsule} />
      ))}
    </group>
  );
}

export default RotatingSpheres;
