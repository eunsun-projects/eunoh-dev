'use client';

import Loading from '@/app/loading';
import { Sphere, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useTimeCapsuleStore } from '../_libs/zustand';
import BloomEffect from './BloomEffect';
import RotatingSphere from './RotatingSphere';
import TimeCapsuleCamera from './TimeCapsuleCamera';

function Scene() {
  const { setFocusedObject } = useTimeCapsuleStore();

  const handlePointerMissed = () => {
    console.log('pointer missed');
    setFocusedObject(null);
  };

  return (
    <Suspense fallback={<Loading />}>
      <div style={{ width: '100%', height: '100%' }}>
        <Canvas
          color="black"
          onPointerMissed={handlePointerMissed}
          camera={{ position: [0, 6, 5], fov: 75 }}
        >
          <ambientLight intensity={0.01} />
          <Sphere scale={0.05} position={[0, 0, 0]}>
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
            <pointLight
              position={[0, 0, 0]}
              intensity={1}
              distance={100}
              decay={2}
              color="white"
              power={80}
            />
          </Sphere>
          <RotatingSphere />
          <Stars count={2500} depth={20} radius={3.5} saturation={1} factor={0.3} speed={3} />
          <BloomEffect />
          <TimeCapsuleCamera />
        </Canvas>
      </div>
    </Suspense>
  );
}

export default Scene;
