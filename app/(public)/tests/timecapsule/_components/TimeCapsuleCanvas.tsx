'use client';

import Loading from '@/app/loading';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';
import { useTimeCapsuleStore } from '../_libs/zustand';
import TimeCapsuleScene from './TimeCapsuleScene';

function TimeCapsuleCanvas() {
  const { focusedObject, setFocusedObject } = useTimeCapsuleStore();

  const handlePointerMissed = () => {
    console.log('pointer missed');
    if (focusedObject?.object.material) {
      (focusedObject?.object.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.03;
    }
    setFocusedObject(null);
  };

  return (
    <Suspense fallback={<Loading />}>
      <div style={{ width: '100%', height: '100%' }}>
        <Canvas
          color="black"
          onPointerMissed={handlePointerMissed}
          camera={{ position: [0, 6, 5], fov: 75 }}
          gl={{ antialias: true }}
        >
          <TimeCapsuleScene />
        </Canvas>
      </div>
    </Suspense>
  );
}

export default TimeCapsuleCanvas;
