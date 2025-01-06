import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function RotatingSphere() {
  // 그룹 레퍼런스
  const groupRef = useRef<THREE.Group>(null);

  // 매 프레임마다 그룹을 회전
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.5 * delta; // 속도 조절
    }
  });

  return (
    <group ref={groupRef}>
      {/* 원점 기준으로 x=1.5 위치에 놓인 구체 */}
      <Sphere scale={0.1} position={[1.5, 0, 0]}>
        <meshStandardMaterial color="yellow" />
      </Sphere>
      <Sphere scale={0.1} position={[-1.5, 0, 0]}>
        <meshStandardMaterial color="blue" />
      </Sphere>
    </group>
  );
}

export default RotatingSphere;
