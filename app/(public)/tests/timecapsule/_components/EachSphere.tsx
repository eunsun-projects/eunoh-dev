'use client';

import { Sphere } from '@react-three/drei';
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useShallow } from 'zustand/react/shallow';
import { TimeCapsuleState, useTimeCapsuleStore } from '../_libs/zustand';

interface EachSphereProps {
  position: number[];
  color: THREE.Color;
}

function EachSphere({ position, color }: EachSphereProps) {
  const { camera, controls } = useThree();
  const sphereRef = useRef<THREE.Mesh>(null);
  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const previousFocusedObject = useRef<THREE.Mesh | null>(null);
  const { focusedObject, setFocusedObject } = useTimeCapsuleStore(
    useShallow((state: TimeCapsuleState) => ({
      focusedObject: state.focusedObject,
      setFocusedObject: state.setFocusedObject,
    })),
  );

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    const object = e.eventObject;
    if (object instanceof THREE.Mesh) {
      setFocusedObject({ object });
    }
  };

  useFrame(() => {
    if (!sphereRef.current || !controls) return;
    if (focusedObject) {
      let target;

      if (focusedObject.instanceId !== undefined) {
        target = new THREE.Vector3().setFromMatrixPosition(focusedObject.object.matrixWorld);
      } else {
        target = focusedObject.object.position.clone();
      }

      const smoothness = 0.05;
      cameraTargetRef.current.lerp(target, smoothness);
      camera.lookAt(target);

      // Zoom을 부드럽게 변경
      const targetZoom = 2; // 목표 줌 레벨
      camera.zoom = THREE.MathUtils.lerp(camera.zoom, targetZoom, smoothness);
      camera.updateProjectionMatrix(); // Zoom 변경 후 프로젝션 매트릭스 업데이트

      (controls as OrbitControls).target.copy(cameraTargetRef.current);
      (controls as OrbitControls).update();
    } else {
      // 초기 카메라 상태 복귀
      const targetZoom = 1; // 초기 줌 레벨
      camera.zoom = THREE.MathUtils.lerp(camera.zoom, targetZoom, 0.05);
      camera.updateProjectionMatrix();
    }
  });

  useEffect(() => {
    if (!focusedObject) {
      if (previousFocusedObject.current) {
        (previousFocusedObject.current?.material as THREE.MeshStandardMaterial).emissiveIntensity =
          0.03;
      }
      return;
    }
    if (previousFocusedObject.current?.uuid !== focusedObject.object.uuid) {
      if (previousFocusedObject.current) {
        (previousFocusedObject.current?.material as THREE.MeshStandardMaterial).emissiveIntensity =
          0.03;
      }
      (focusedObject.object.material as THREE.MeshStandardMaterial).emissiveIntensity = 4;
    } else {
      (previousFocusedObject.current?.material as THREE.MeshStandardMaterial).emissiveIntensity = 4;
    }
    previousFocusedObject.current = focusedObject.object;
  }, [focusedObject, controls]);

  return (
    <Sphere
      ref={sphereRef}
      scale={0.1}
      position={position}
      onClick={handleClick}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'default')}
    >
      <Sphere scale={1.2} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
          opacity={0.1}
          transparent
        />
      </Sphere>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.01} />
    </Sphere>
  );
}

export default EachSphere;
