/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BufferGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  LineSegments,
  Vector2,
} from 'three';

export class MovingGrid extends LineSegments {
  totalTime: { value: number };
  update: (dt: number) => void;

  constructor(width = 200, height = 200, divisions = 20, speed = 5) {
    // (1) 먼저, 임시로 LineSegments + 기본 material 세팅
    super(new BufferGeometry(), new LineBasicMaterial({ color: 0xffffff }));

    this.totalTime = { value: 0 };

    // (2) geometry 구성: 가로선, 세로선 라인의 시작점-끝점.
    //     (width x height 범위 안에, divisions 만큼 라인)
    const positions: number[] = [];
    const moveable: number[] = [];
    const halfW = width / 2;
    const halfH = height / 2;
    const stepW = width / divisions;
    const stepH = height / divisions;

    // 가로선
    for (let i = 0; i <= divisions; i++) {
      const y = -halfH + i * stepH;
      // 라인: ( -halfW, y ) ~ ( +halfW, y )
      positions.push(-halfW, y, 0);
      positions.push(+halfW, y, 0);
      // 가로선은 moveable = 1 (예시)
      moveable.push(1, 1);
    }

    // 세로선
    for (let i = 0; i <= divisions; i++) {
      const x = -halfW + i * stepW;
      // 라인: ( x, -halfH ) ~ ( x, +halfH )
      positions.push(x, -halfH, 0);
      positions.push(x, +halfH, 0);
      // 세로선은 moveable = 1 (혹은 0으로 해서 안 움직이게 할 수도 있음)
      moveable.push(1, 1);
    }

    const posArray = new Float32BufferAttribute(new Float32Array(positions), 3);
    const movArray = new Float32BufferAttribute(new Float32Array(moveable), 1);
    this.geometry.setAttribute('position', posArray);
    this.geometry.setAttribute('moveable', movArray);

    // (3) material을 ShaderMaterial로 교체 + onBeforeCompile
    //     여기서는 "z축" 방향으로 라인을 계속 움직이는 예시
    const baseMat = new LineBasicMaterial({ color: 0x80a6ed });
    baseMat.onBeforeCompile = (shader: any) => {
      // (3-1) uniforms 추가
      shader.uniforms.time = this.totalTime;
      shader.uniforms.speed = { value: speed };
      shader.uniforms.limits = { value: new Vector2(-50, 50) };
      // 실제 이동 범위를 controls

      // (3-2) vertexShader 수정
      shader.vertexShader = `
        uniform float time;
        uniform float speed;
        uniform vec2 limits;

        attribute float moveable;

        ${shader.vertexShader}
      `.replace(
        '#include <begin_vertex>',
        /* gl_Position 직전에 'position' 수정 로직 삽입 */
        `#include <begin_vertex>
         if(moveable > 0.5){
           float dist = speed * time;
           float limLen = limits.y - limits.x;
           // z축으로만 이동
           transformed.z = mod(position.z + dist - limits.x, limLen) + limits.x;
         }`,
      );

      // (3-3) fragmentShader 별도 변경 필요 없으면 그대로
      //       color나 투명도 등을 건드리고 싶다면 비슷하게 replace해서 수정 가능
    };

    // (3-4) 최종 material 할당
    this.material = baseMat;

    // (4) 매 프레임 update 함수
    this.update = (dt: number) => {
      // dt만큼 totalTime 증가
      this.totalTime.value += dt;
    };
  }
}
