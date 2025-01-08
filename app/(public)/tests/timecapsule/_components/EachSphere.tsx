'use client';

import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useShallow } from 'zustand/react/shallow';
import { TimeCapsuleState, useTimeCapsuleStore } from '../_libs/zustand';

interface EachSphereProps {
  count: number;
}

function EachSphere({ count = 1 }: EachSphereProps) {
  const { camera, controls } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const { focusedObject, setFocusedObject } = useTimeCapsuleStore(
    useShallow((state: TimeCapsuleState) => ({
      focusedObject: state.focusedObject,
      setFocusedObject: state.setFocusedObject,
    })),
  );

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    const object = e.eventObject;
    const instanceId = e.instanceId;
    if (object instanceof THREE.InstancedMesh) {
      if (instanceId !== undefined) {
        setFocusedObject({ object, instanceId });
      } else {
        setFocusedObject({ object });
      }
    }
  };

  const instanceColor = useMemo(() => {
    const hue = 250 + Math.random() * 50; // Random hue
    const saturation = 40 + Math.random() * 60; // Random saturation
    const lightness = 60; // Fixed lightness

    return new THREE.Color(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }, []);

  console.log(controls);
  useFrame((state, delta) => {
    if (!meshRef.current || !controls) return;
    if (focusedObject) {
      let target;

      if (focusedObject.instanceId !== undefined) {
        target = new THREE.Vector3().setFromMatrixPosition(focusedObject.object.matrixWorld);
      } else {
        target = focusedObject.object.position.clone();
      }

      const smoothness = 0.05;
      cameraTargetRef.current.lerp(target, smoothness);
      camera.lookAt(cameraTargetRef.current);

      // Zoom을 부드럽게 변경
      const targetZoom = 5; // 목표 줌 레벨
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
    if (focusedObject) {
      (meshRef.current?.material as THREE.MeshStandardMaterial).emissiveIntensity = 2;
    } else {
      (meshRef.current?.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.01;
    }
  }, [focusedObject, controls]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      castShadow
      receiveShadow
      onClick={handleClick}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'default')}
      position={[1.5, 0, 0]}
    >
      <sphereGeometry args={[0.05, 32, 32]} />
      <meshStandardMaterial
        color={instanceColor}
        emissive={instanceColor}
        emissiveIntensity={0.01}
      />
    </instancedMesh>
  );
}

export default EachSphere;
