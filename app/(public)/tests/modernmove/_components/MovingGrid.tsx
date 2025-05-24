/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const CustomMovingGrid = () => {
  const gridRef = useRef<THREE.GridHelper>(null);
  const materialRef = useRef<any | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    // Material 초기화
    materialRef.current = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        limits: { value: new THREE.Vector2(-100, 100) },
        speed: { value: 23 },
      },
      vertexShader: `
        uniform float time;
        uniform vec2 limits;
        uniform float speed;
        attribute float moveable;
        varying vec3 vColor;

        void main() {
          vColor = color;
          float limLen = limits.y - limits.x;
          vec3 pos = position;
          if (floor(moveable + 0.5) > 0.5){
            float dist = speed * time;
            float currPos = mod((pos.z + dist) - limits.x, limLen) + limits.x;
            pos.z = currPos;
          }
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          gl_FragColor = vec4(vColor, 1.);
        }
      `,
      vertexColors: true,
    });

    // Moveable 속성 설정
    const division = 20;
    const moveable = [];
    for (let i = 0; i <= division; i++) {
      moveable.push(1, 1, 0, 0);
    }
    gridRef.current.geometry.setAttribute(
      "moveable",
      new THREE.BufferAttribute(new Uint8Array(moveable), 1),
    );

    // Material 적용
    gridRef.current.material = materialRef.current as any;
  }, []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      const time = clock.getElapsedTime();
      materialRef.current.uniforms.time.value = time;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[250, 20, "#80a6ed", "#80a6ed"]}
      position={[0, -12, 0]}
    />
  );
};

export default CustomMovingGrid;
