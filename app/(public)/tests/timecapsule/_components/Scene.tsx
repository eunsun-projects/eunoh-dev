'use client';

import Loading from '@/app/loading';
import { CameraControls, PerspectiveCamera, Sphere, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import BloomEffect from './BloomEffect';
import RotatingSphere from './RotatingSphere';

function Scene() {
  return (
    <Suspense fallback={<Loading />}>
      <div style={{ width: '100%', height: '100%' }}>
        <Canvas
          color="black"
          camera={{
            position: [0, 6, 5], // 카메라를 약간 뒤로 이동
            fov: 75, // 시야각(FOV)
          }}
        >
          <Sphere scale={0.05} position={[0, 0, 0]}>
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
            {/* sphere가 “빛을 내는 것” 처럼 보이게 하려면 같은 위치에 라이트 추가 */}
            <pointLight
              position={[0, 0, 0]}
              intensity={1}
              distance={100}
              decay={2}
              color="white"
              power={20}
            />
          </Sphere>
          <RotatingSphere />
          <Stars count={2500} depth={20} radius={3.5} saturation={1} factor={0.3} speed={3} />
          <CameraControls makeDefault maxDistance={50} />
          <PerspectiveCamera />
          <BloomEffect />
        </Canvas>
      </div>
    </Suspense>
  );
}

export default Scene;
