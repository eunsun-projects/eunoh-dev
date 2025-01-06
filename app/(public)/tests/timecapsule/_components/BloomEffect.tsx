'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

function BloomEffect() {
  const { scene, camera, gl, size } = useThree();
  const composerRef = useRef<EffectComposer | null>(null);

  useEffect(() => {
    // EffectComposer 인스턴스 생성
    composerRef.current = new EffectComposer(gl);
    composerRef.current.setSize(size.width, size.height);

    // 씬을 그리는 RenderPass 추가
    const renderPass = new RenderPass(scene, camera);
    composerRef.current.addPass(renderPass);

    // UnrealBloomPass 추가
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height), // 해상도
      3, // strength
      1, // radius
      0, // threshold
      // 3, // strength
      // 0, // radius
      // 0, // threshold
    );
    composerRef.current.addPass(bloomPass);
    gl.toneMapping = THREE.ReinhardToneMapping;
  }, [scene, camera, gl, size]);

  // 매 프레임마다 composer를 이용해 렌더링
  useFrame(() => {
    composerRef.current?.render();
  }, 1);

  return null;
}

export default BloomEffect;
