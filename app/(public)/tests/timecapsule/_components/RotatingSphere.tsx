'use client';

import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import EachSphere from './EachSphere';

function RotatingSphere() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.05 * delta; // 속도 조절
    }
  });

  return (
    <group ref={groupRef}>
      <EachSphere count={1} />
      <Sphere scale={0.1} position={[-1.5, 0, 0]}>
        <meshStandardMaterial color="blue" />
      </Sphere>
    </group>
  );
}

export default RotatingSphere;
