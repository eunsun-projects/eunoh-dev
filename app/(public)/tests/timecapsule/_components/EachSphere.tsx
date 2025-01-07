'use client';

import { Sphere } from '@react-three/drei';
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useShallow } from 'zustand/react/shallow';
import { TimeCapsuleState, useTimeCapsuleStore } from '../_libs/zustand';

function EachSphere() {
  const { camera } = useThree();
  const initialCameraPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const sphereRef = useRef<THREE.Mesh>(null);
  const { isClicked, setIsClicked } = useTimeCapsuleStore(
    useShallow((state: TimeCapsuleState) => ({
      isClicked: state.isClicked,
      setIsClicked: state.setIsClicked,
    })),
  );

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    const target = e.eventObject;
    if (target instanceof THREE.Mesh) {
      setIsClicked(!isClicked);
    }
  };

  useFrame(() => {
    if (!sphereRef.current) return;

    const worldPosition = new THREE.Vector3();
    const targetPosition = sphereRef.current.getWorldPosition(worldPosition);

    if (isClicked) {
      // Move the camera closer to the sphere
      const closePosition = targetPosition.clone().add(new THREE.Vector3(0, 0.5, 1)); // Adjust offset
      camera.position.lerp(closePosition, 0.02);
      camera.lookAt(targetPosition); // Keep the camera looking at the sphere
      camera.zoom = 6;
      camera.updateProjectionMatrix();
    } else {
      // Move the camera back to its initial position
      camera.position.lerp(initialCameraPos.current, 0.02);
      camera.zoom = 1;
      camera.updateProjectionMatrix();
    }
  });

  // 최초 마운트 시점에 카메라 초기 위치 저장
  useEffect(() => {
    initialCameraPos.current.copy(camera.position);
  }, [camera]);

  useEffect(() => {
    if (sphereRef.current) {
      (sphereRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = isClicked
        ? 2
        : 0.01;
    }
  }, [isClicked, camera]);

  return (
    <Sphere
      ref={sphereRef}
      className="cursor-pointer"
      scale={0.1}
      position={[1.5, 0, 0]}
      onClick={handleClick}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'default')}
    >
      <meshStandardMaterial color="hotpink" emissive="hotpink" emissiveIntensity={0.01} />
    </Sphere>
  );
}

export default EachSphere;
