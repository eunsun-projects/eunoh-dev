'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { MeshLine, MeshLineMaterial } from 'three.meshline';
import { useModernMoveContext } from './ModernMoveContext';

interface CustomTrailProps {
  /** 초기 위치 */
  position: [number, number, number];
}

export default function CustomTrail({ position }: CustomTrailProps) {
  const { meteor } = useModernMoveContext();

  const memoizedPosition = useMemo(() => position, [position]);

  // 별(원) Mesh
  const starRef = useRef<THREE.Mesh>(null);

  // linePoints: 라인(꼬리)를 구성하는 좌표들(x,y,z)
  const pointsRef = useRef<number[]>([]);
  const lineLength = 40; // Trail 길이

  // MeshLine 인스턴스
  const [meshLine] = useState(() => new MeshLine());

  useEffect(() => {
    // lineLength * 3개의 공간(x,y,z)을 준비
    pointsRef.current = new Array(lineLength * 3);

    // "별의 초기 위치"로 전부 채워넣기
    for (let i = 0; i < lineLength; i++) {
      pointsRef.current[i * 3 + 0] = memoizedPosition[0];
      pointsRef.current[i * 3 + 1] = memoizedPosition[1];
      pointsRef.current[i * 3 + 2] = memoizedPosition[2];
    }

    // 이 초기 포인트를 meshLine에 설정
    meshLine.setPoints(pointsRef.current);
  }, [meshLine, memoizedPosition, lineLength]);

  useFrame((state, delta) => {
    if (!starRef.current) return;
    // 별의 월드 좌표 구하기
    const starPos = new THREE.Vector3();
    starRef.current.getWorldPosition(starPos);
    // Trail 갱신: 새 위치를 배열 맨 앞에 넣고, 오래된 것 지우기
    pointsRef.current.unshift(starPos.x, starPos.y, starPos.z);
    pointsRef.current.splice(-3, 3);
    meshLine.setPoints(pointsRef.current);

    // 사용자가 'meteor.current = true'면 별이 좌하단으로 이동
    if (meteor.current) {
      // 별 이동 로직 (대각선 이동)
      starRef.current.position.x -= delta * 200;
      starRef.current.position.y -= delta * 200;
    } else {
      // meteor.current가 false면 별은 원래 위치로
      starRef.current.position.set(memoizedPosition[0], memoizedPosition[1], memoizedPosition[2]);

      // lineLength * 3개의 공간(x,y,z)을 준비
      pointsRef.current = new Array(lineLength * 3);

      // "별의 초기 위치"로 전부 채워넣기
      for (let i = 0; i < lineLength; i++) {
        pointsRef.current[i * 3 + 0] = memoizedPosition[0];
        pointsRef.current[i * 3 + 1] = memoizedPosition[1];
        pointsRef.current[i * 3 + 2] = memoizedPosition[2];
      }
    }
  });

  return (
    <>
      {/* (1) 별(원) Mesh */}
      <mesh ref={starRef} position={memoizedPosition}>
        <circleGeometry args={[1, 10]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* (2) 라인(꼬리) Mesh */}
      <mesh>
        <primitive object={meshLine} attach="geometry" />
        <primitive
          object={
            new MeshLineMaterial({
              color: 'white',
              lineWidth: 1,
              transparent: true,
              opacity: 0.8,
              depthTest: false,
            })
          }
          attach="material"
        />
      </mesh>
    </>
  );
}

// 'use client';

// import { Circle, Trail } from '@react-three/drei';
// import { useFrame } from '@react-three/fiber';
// import { useRef } from 'react';
// import { Mesh } from 'three';
// import { useModernMoveContext } from './ModernMoveContext';

// export default function StarTrail({ position }: { position: [number, number, number] }) {
//   const starRef = useRef<Mesh>(null);
//   const { meteor } = useModernMoveContext();

//   useFrame((state, delta) => {
//     if (starRef.current) {
//       if (meteor.current) {
//         starRef.current.position.x -= delta * 120;
//         starRef.current.position.y -= delta * 120;
//       } else {
//         starRef.current.position.x = position[0];
//         starRef.current.position.y = position[1];
//       }
//     }
//   });

//   return (
//     <Trail
//       width={10} // Width of the line
//       color={'white'} // Color of the line
//       length={5} // Length of the line
//       decay={1} // How fast the line fades away
//       local={false} // Wether to use the target's world or local positions
//       stride={0} // Min distance between previous and current point
//       interval={1} // Number of frames to wait before next calculation
//       target={undefined} // Optional target. This object will produce the trail.
//       attenuation={(width) => width} // A function to define the width in each point along it.
//     >
//       <Circle ref={starRef} position={position} scale={[1.3, 1.3, 1.3]} args={[1, 10]} />
//     </Trail>
//   );
// }
