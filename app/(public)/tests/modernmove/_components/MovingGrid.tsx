/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CustomMovingGrid = () => {
  const gridRef = useRef<any>(null);
  const limit = 100;

  useEffect(() => {
    if (gridRef.current) {
      const division = 20;
      const moveable = [];
      for (let i = 0; i <= division; i++) {
        moveable.push(1, 1, 0, 0); // move horizontal lines only
      }
      gridRef.current.geometry.attributes.moveable = new THREE.BufferAttribute(
        new Uint8Array(moveable),
        1,
      );
    }
  }, []);

  useFrame(({ clock }) => {
    if (gridRef.current) {
      const time = clock.getElapsedTime();
      gridRef.current.material.uniforms.time.value = time;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[250, 20, '#80a6ed', '#80a6ed']}
      position={[0, -12, 0]}
      material={
        new THREE.ShaderMaterial({
          uniforms: {
            time: {
              value: 0,
            },
            limits: {
              value: new THREE.Vector2(-limit, limit),
            },
            speed: {
              value: 23, //5
            },
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
                        if (floor(moveable + 0.5) > 0.5){ // if a point has "moveable" attribute = 1
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
        }) as any
      }
    />
  );
};

export default CustomMovingGrid;

// 'use client';

// import { useMemo } from 'react';
// import * as THREE from 'three';

// interface CustomMovingGridProps {
//   size?: number; // 전체 격자의 크기 (가로/세로)
//   divisions?: number; // 몇 줄을 그릴지
//   speed?: number; // 라인이 움직이는 속도
//   moveHorizontal?: boolean; // true면 x축방향 라인을 움직이고, false면 z축방향
//   ref?: React.RefObject<THREE.ShaderMaterial>;
// }

// /**
//  *  직접 구현한 "움직이는 격자" LineSegments
//  *  - size: 격자의 범위 (예: 200이면 -100~+100)
//  *  - divisions: 선의 개수 (divisions + 1개 라인이 생김)
//  *  - speed: 움직임 속도
//  *  - moveHorizontal: 어떤 방향의 라인을 움직일지 (옵션)
//  */
// export default function CustomMovingGrid({
//   size = 200,
//   divisions = 20,
//   speed = 5,
//   moveHorizontal = true,
//   ref,
// }: CustomMovingGridProps) {
//   // 라인(geometry) 구성
//   const geometry = useMemo(() => {
//     /**
//      * 격자를 구성하는 전체 라인의 "시작점 - 끝점" 좌표들을
//      * 한 덩어리(positions)로 넣어 BufferGeometry를 만듭니다.
//      *
//      * divisions = 20이라면,
//      *  - 가로선 21개
//      *  - 세로선 21개
//      * => 총 42개 라인, 각 라인은 2개의 점, 즉 42 * 2 = 84개의 점이 생깁니다.
//      */
//     const positions: number[] = [];
//     const moveable: number[] = []; // 0 or 1로 "움직이는 선인지" 표시

//     const halfSize = size / 2;
//     const step = size / divisions;

//     // 1) 가로선(x축 수평) => z가 -size/2 ~ +size/2
//     for (let i = 0; i <= divisions; i++) {
//       const z = -halfSize + i * step; // z 위치
//       // 시작점(-halfSize, 0, z) ~ 끝점(+halfSize, 0, z)
//       positions.push(-halfSize, 0, z);
//       positions.push(halfSize, 0, z);

//       // 가로선은 moveHorizontal이면 "움직이게" 표시, 아니면 고정
//       const val = moveHorizontal ? 1 : 0;
//       moveable.push(val, val);
//     }

//     // 2) 세로선(z축 수직) => x가 -size/2 ~ +size/2
//     for (let i = 0; i <= divisions; i++) {
//       const x = -halfSize + i * step;
//       // 시작점(x, 0, -halfSize) ~ 끝점(x, 0, +halfSize)
//       positions.push(x, 0, -halfSize);
//       positions.push(x, 0, halfSize);

//       // 세로선은 moveHorizontal=false일 때 "움직이는" 설정
//       // (즉 z축 방향으로 움직이고 싶다면 여기서 1)
//       const val = moveHorizontal ? 0 : 1;
//       moveable.push(val, val);
//     }

//     // Float32Array 변환
//     const positionArray = new Float32Array(positions);
//     const moveableArray = new Float32Array(moveable);

//     // BufferGeometry 생성
//     const geom = new THREE.BufferGeometry();
//     geom.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
//     geom.setAttribute('moveable', new THREE.BufferAttribute(moveableArray, 1));

//     return geom;
//   }, [size, divisions, moveHorizontal]);

//   // geometry.attributes.position.needsUpdate = true;
//   // geometry.attributes.moveable.needsUpdate = true;

//   // // 매 프레임마다 time 업데이트
//   // useFrame((state) => {
//   //   if (materialRef.current) {
//   //     // console.log(state.clock.getElapsedTime());
//   //     materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
//   //   }
//   // });

//   return (
//     <lineSegments geometry={geometry}>
//       <shaderMaterial
//         ref={ref}
//         vertexShader={`
//           uniform float time;
//           uniform float speed;
//           uniform vec2 limits;

//           attribute float moveable; // 0 또는 1

//           varying vec3 vColor;

//           void main() {
//             // 디폴트 vertex color는 (1,1,1) 또는 없는 경우도 있어,
//             // 필요하다면 BufferAttribute로 color를 따로 넣을 수도 있습니다.
//             vColor = vec3(1.0, 1.0, 1.0);

//             // 현재 정점의 위치
//             vec3 newPosition = position;
//             float limLen = limits.y - limits.x;

//             // moveable == 1인 선만 time에 따라 z축(또는 x축) 이동
//             if (moveable > 0.5) {
//               float dist = speed * time;
//               // 여기서는 z축으로 이동 예시
//               //  - limits.x ~ limits.y 범위 내에서 반복
//               float currPos = mod((newPosition.z + dist) - limits.x, limLen) + limits.x;
//               newPosition.z = currPos;
//             }

//             gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
//           }
//         `}
//         fragmentShader={`
//           varying vec3 vColor;
//           void main() {
//             gl_FragColor = vec4(vColor, 1.0);
//           }
//         `}
//         uniforms={{
//           time: { value: 0 },
//           speed: { value: speed },
//           limits: { value: new THREE.Vector2(-size / 2, size / 2) },
//         }}
//         // vertexColors 옵션 -> 선분 컬러를 정점 컬러로 할 때 사용
//         // 여기서는 정점 컬러 별도로 주입 안했으므로 필요치 않을 수도 있음
//         // vertexColors
//         vertexColors={true}
//       />
//     </lineSegments>
//   );
// }
