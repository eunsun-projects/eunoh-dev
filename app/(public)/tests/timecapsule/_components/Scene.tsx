'use client';

import Loading from '@/app/loading';
import { CameraControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

function Scene() {
  return (
    <Suspense fallback={<Loading />}>
      <div style={{ width: '100%', height: '100%' }}>
        <Canvas color="black">
          {/* <ambientLight /> */}
          {/* <directionalLight color="#fff" position={[0, 5, 10]} intensity={5} /> */}
          <Stars count={2500} depth={20} radius={3.5} saturation={1} factor={0.3} speed={3} />
          <CameraControls makeDefault maxDistance={50} />
          <PerspectiveCamera />
        </Canvas>
      </div>
    </Suspense>
  );
}

export default Scene;
