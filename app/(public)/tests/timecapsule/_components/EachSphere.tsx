'use client';

import { Sphere } from '@react-three/drei';
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useShallow } from 'zustand/react/shallow';
import { TimeCapsule, TimeCapsuleState, useTimeCapsuleStore } from '../_libs/zustand';

interface EachSphereProps {
  timeCapsule: TimeCapsule;
}

function EachSphere({ timeCapsule }: EachSphereProps) {
  const { camera, controls } = useThree();
  const sphereRef = useRef<THREE.Mesh>(null);
  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const previousFocusedObject = useRef<THREE.Mesh | null>(null);
  const { focusedObject, timeCapsules, setFocusedObject, updateTimeCapsule } = useTimeCapsuleStore(
    useShallow((state: TimeCapsuleState) => ({
      focusedObject: state.focusedObject,
      timeCapsules: state.timeCapsules,
      setFocusedObject: state.setFocusedObject,
      updateTimeCapsule: state.updateTimeCapsule,
    })),
  );
  const initialTimeCapsulesLength = useRef(timeCapsules.length);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    const object = e.eventObject;
    if (object instanceof THREE.Mesh) {
      setFocusedObject({ object, timeCapsule });
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

      // Fov를 부드럽게 변경
      if (camera instanceof THREE.PerspectiveCamera) {
        const targetFOV = 60; // 목표 줌 레벨
        camera.fov = THREE.MathUtils.lerp(camera.fov, targetFOV, smoothness);
        camera.updateProjectionMatrix(); // Zoom 변경 후 프로젝션 매트릭스 업데이트
      }

      (controls as OrbitControls).target.copy(cameraTargetRef.current);
      (controls as OrbitControls).update();
    } else {
      // 초기 카메라 상태 복귀
      if (camera instanceof THREE.PerspectiveCamera) {
        const targetFOV = 135; // 초기 줌 레벨
        camera.fov = THREE.MathUtils.lerp(camera.fov, targetFOV, 0.05);
        camera.updateProjectionMatrix();
      }
    }
  });

  useEffect(() => {
    if (!focusedObject) {
      if (previousFocusedObject.current) {
        (previousFocusedObject.current?.material as THREE.MeshStandardMaterial).emissiveIntensity =
          0.01;
      }
      return;
    }
    if (previousFocusedObject.current?.uuid !== focusedObject.object.uuid) {
      if (previousFocusedObject.current) {
        (previousFocusedObject.current?.material as THREE.MeshStandardMaterial).emissiveIntensity =
          0.01;
      }
      (focusedObject.object.material as THREE.MeshStandardMaterial).emissiveIntensity = 4;
    } else {
      (previousFocusedObject.current?.material as THREE.MeshStandardMaterial).emissiveIntensity = 4;
    }
    previousFocusedObject.current = focusedObject.object;
  }, [focusedObject, controls]);

  useEffect(() => {
    if (timeCapsules.length > initialTimeCapsulesLength.current) {
      setFocusedObject({
        object: sphereRef.current as THREE.Mesh,
        timeCapsule: timeCapsules[timeCapsules.length - 1],
      });
    }
  }, [timeCapsules, setFocusedObject, updateTimeCapsule]);

  useEffect(() => {
    if (!sphereRef.current) return;
    sphereRef.current.userData = {
      name: 'timeCapsule',
      timeCapsule,
    };
    updateTimeCapsule(sphereRef.current);
  }, [timeCapsule, updateTimeCapsule]);

  return (
    <Sphere
      ref={sphereRef}
      scale={0.25}
      position={timeCapsule.position}
      onClick={handleClick}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'default')}
    >
      <Sphere scale={0.8} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={timeCapsule.color}
          emissive={timeCapsule.color}
          emissiveIntensity={0.01}
        />
      </Sphere>
      <meshStandardMaterial
        color={timeCapsule.color}
        emissive={timeCapsule.color}
        emissiveIntensity={1}
        opacity={0.1}
        transparent
      />
    </Sphere>
  );
}

export default EachSphere;
