/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Physics, usePlane } from "@react-three/cannon";
import { PerspectiveCamera, Torus, useHelper } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { Joystick } from "nipplejs";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import CustomCameraRotationControls from "../_controls/CustomCameraRotationControls";
import ManualComposer from "./ManualComposer";

const SmallTorus = forwardRef(
  (
    props: {
      position: [number, number, number];
      color: string;
      emissive: string;
    },
    ref: React.Ref<THREE.Mesh>,
  ) => {
    return (
      <Torus
        ref={ref}
        args={[15, 0.7, 16, 100]}
        position={props.position}
        scale={[0.05, 0.05, 0.05]}
      >
        <meshPhongMaterial
          color={props.color}
          emissive={props.emissive}
          emissiveIntensity={7}
        />
      </Torus>
    );
  },
);

SmallTorus.displayName = "SmallTorus";

const Player = forwardRef((props, ref: React.Ref<THREE.PerspectiveCamera>) => {
  return (
    <PerspectiveCamera
      ref={ref}
      fov={95}
      makeDefault
      position={[0, 100, 0]}
      near={1}
      far={10000}
    />
  );
});
Player.displayName = "Player";

const Floor = (props: {
  rotation: [number, number, number];
  color: string;
}) => {
  const [ref] = usePlane<THREE.Mesh>(() => ({
    type: "Static",
    mass: 0,
    ...props,
  }));

  return (
    <mesh receiveShadow rotation={props.rotation} ref={ref}>
      <planeGeometry args={[1000, 1000]} />
      <meshPhongMaterial color={props.color} />
    </mesh>
  );
};

interface CircleSceneProps {
  audio: HTMLAudioElement;
  joysticRef: React.RefObject<HTMLDivElement | null>;
}

// 링 일때, args={[5, 5.5, 50]}
// 토러스 매터리얼 컬러 #e303fc #2f0742 #2c0240 에미시브 #ff87f1 #5b0b80 바닥 #c7b6de #ffffff
// direction 라이트 인텐시티 6 밝을때
function CircleScene({ audio, joysticRef }: CircleSceneProps) {
  const [previousPosition, setPreviousPosition] = useState(
    new THREE.Vector3(0, 3, 80),
  );
  const [circleColor, setCircleColor] = useState("#e303fc");
  const [circleEmissive, setCircleEmissive] = useState("#ff87f1");
  const [isColliding, setIsColliding] = useState(false);
  const [moveDirections, setMoveDirections] = useState<THREE.Vector3 | null>(
    null,
  );
  const [startMoving, setStartMoving] = useState<boolean | null>(null);
  const [startSeq, setStartSeq] = useState(true);

  const torusRef = useRef<THREE.Mesh>(null);
  const smallTorusRef_1 = useRef<THREE.Mesh>(null);
  const smallTorusRef_2 = useRef<THREE.Mesh>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { camera } = useThree();

  const torusBoundingBox = new THREE.Box3();
  const torusBoundingBox_2 = new THREE.Box3();
  const playerBoundingBox = new THREE.Box3();
  const cameraWorldPosition = new THREE.Vector3();
  const targetPosition = useMemo(() => new THREE.Vector3(0, 3, 80), []);
  const lookAtPosition = useMemo(() => new THREE.Vector3(0, 20, 0), []);

  useHelper(
    smallTorusRef_1 as React.MutableRefObject<THREE.Object3D>,
    THREE.BoxHelper,
    "blue",
  );

  useFrame(({ clock }) => {
    if (!torusRef.current) return;
    if (!smallTorusRef_1.current) return;
    if (!smallTorusRef_2.current) return;
    const currentPosition = camera.position.clone(); // 마지막 포지션 저장
    const elapsedTime = clock.getElapsedTime();
    torusRef.current.rotation.y = elapsedTime / 2;
    torusRef.current.position.y = 50 + Math.sin(Date.now() / 1000) * 3;

    smallTorusRef_1.current.position.y = 2.5 + Math.sin(Date.now() / 1000) * 1;
    smallTorusRef_2.current.position.y = 2.5 + Math.sin(Date.now() / 1000) * 1;

    torusBoundingBox.setFromCenterAndSize(
      smallTorusRef_1.current.position,
      new THREE.Vector3(2.5, 2.5, 2.5),
    );
    torusBoundingBox_2.setFromCenterAndSize(
      smallTorusRef_2.current.position,
      new THREE.Vector3(2.5, 2.5, 2.5),
    );

    camera.getWorldPosition(cameraWorldPosition);
    playerBoundingBox.setFromCenterAndSize(
      cameraWorldPosition,
      new THREE.Vector3(2.5, 2.5, 2.5),
    );

    // 충돌 감지 로직...
    if (playerBoundingBox.intersectsBox(torusBoundingBox)) {
      audio.playbackRate = 0.2;
      const timeout = setTimeout(() => {
        audio.playbackRate = 1;
        clearTimeout(timeout);
      }, 2000);

      setIsColliding(true);

      // 1. 충돌한 물체의 중심 위치와 카메라의 위치를 기반으로 방향 벡터를 계산합니다.
      const direction = new THREE.Vector3().subVectors(
        cameraWorldPosition,
        smallTorusRef_1.current.position,
      );
      // 2. 방향 벡터를 정규화합니다.
      direction.normalize();
      // 3. 정규화된 방향 벡터에 원하는 거리만큼 곱합니다.
      direction.multiplyScalar(0.1); // 여기서 0.1은 원하는 거리입니다.
      // 4. 그 결과를 현재 카메라의 위치에 더하여 카메라의 위치를 업데이트합니다.
      camera.position.add(direction);
      setMoveDirections(null); // 충돌시 방향벡터 무효화 해야, 계속 이동하지 않음
    } else {
      setIsColliding(false);
      if (moveDirections) {
        // moveDirections 가 있으면 camera add(이동) 없으면 camera copy(정지)
        setPreviousPosition(currentPosition);
        camera.position.add(moveDirections);
      }
    }

    if (playerBoundingBox.intersectsBox(torusBoundingBox_2)) {
      audio.playbackRate = 0.2;
      setCircleColor("#fac90a");
      setCircleEmissive("#ffe78a");
    } else {
      audio.playbackRate = 1;
      setCircleColor("#e303fc");
      setCircleEmissive("#ff87f1");
    }

    if (startMoving && camera) {
      camera.position.lerp(targetPosition, 0.02); // 0.05는 보간 값이며, 이 값을 조절하여 애니메이션의 속도를 조절할 수 있습니다.
      camera.lookAt(lookAtPosition); // 카메라가 계속해서 lookAtPosition을 바라보도록 설정
      if (camera.position.y <= 3.1 && camera.position.z >= 79.9) {
        setStartMoving(false);
        setStartSeq(false);
      }
    }
  });

  useEffect(() => {
    // 1초 후에 카메라 움직임 시작
    const timer = setTimeout(() => {
      setStartMoving(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (camera && startSeq) {
      camera.lookAt(lookAtPosition); // 카메라가 (0, 0, 0) 위치를 (바닥면) 바라보게 설정
      camera.updateProjectionMatrix(); // 카메라의 투영 행렬을 업데이트
    }
  }, [camera, lookAtPosition, startSeq]);

  useEffect(() => {
    if (!camera) return;
    const nipplejs = require("nipplejs");
    const options = {
      zone: joysticRef.current as HTMLElement,
      mode: "static" as const,
      position: { right: "50%", bottom: "50%" },
      threshold: 0.1,
      size: 100,
    };

    const manager = nipplejs.create(options);

    if (startSeq) {
      (
        (manager as unknown as Joystick).options?.zone as HTMLElement
      ).style.opacity = "0";
    } else {
      (
        (manager as unknown as Joystick).options?.zone as HTMLElement
      ).style.opacity = "1";
    }

    manager.on("move", (event: any, data: any) => {
      // 조이스틱의 움직임에 따른 방향 벡터를 계산합니다.
      const moveDirection = new THREE.Vector3();
      if (data.direction?.angle) {
        const radian = data.angle.radian; // radian 판단
        if (!isColliding && startMoving === false) {
          // 충돌 상태가 아닐 때만 움직임을 처리
          if (radian < 0.524 || radian > 5.756) {
            // right
            moveDirection.x = 1;
          } else if (radian < 1.046 && radian > 0.524) {
            // right up
            moveDirection.x = 1;
            moveDirection.z = -1;
          } else if (radian < 2.092 && radian > 1.046) {
            // up
            moveDirection.z = -1;
          } else if (radian < 2.615 && radian > 2.092) {
            // left up
            moveDirection.z = -1;
            moveDirection.x = -1;
          } else if (radian < 3.662 && radian > 2.615) {
            // left
            moveDirection.x = -1;
          } else if (radian < 4.186 && radian > 3.662) {
            // left down
            moveDirection.x = -1;
            moveDirection.z = 1;
          } else if (radian < 5.233 && radian > 4.186) {
            // down
            moveDirection.z = 1;
          } else if (radian < 5.756 && radian > 5.233) {
            // down right
            moveDirection.z = 1;
            moveDirection.x = 1;
          }

          // 2) 카메라의 yaw 추출
          const euler = new THREE.Euler(0, 0, 0, "YXZ");
          euler.setFromQuaternion(camera.quaternion);
          // yaw only
          const yaw = euler.y;

          // 3) moveDirection을 yaw만큼 회전
          moveDirection.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);

          // 4) speed 곱하고 플레이어(혹은 카메라) 위치 이동
          const speed = 0.05;
          moveDirection.multiplyScalar(speed);
          camera.position.add(moveDirection);

          setMoveDirections(moveDirection);
        } else {
          setMoveDirections(null);
        }
      }
    });

    manager.on("end", () => {
      // console.log('end')
      setMoveDirections(null);
    });

    // 컴포넌트가 unmount될 때 이벤트 리스너와 객체를 정리합니다.
    return () => {
      manager.destroy();
    };
  }, [camera, isColliding, startMoving, startSeq, joysticRef]);

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight color="#f2d9fa" position={[0, 40, 0]} intensity={3.2} />
      <hemisphereLight args={[0xffffff, 0xffffff, 0.5]} />

      <CustomCameraRotationControls />

      <Physics gravity={[0, -9.8, 0]}>
        <Player ref={cameraRef} />
        <mesh ref={torusRef} position={[0, 50, 0]} scale={[1, 1, 1]}>
          <torusGeometry args={[15, 0.7, 16, 100]} />
          <meshPhongMaterial
            color={circleColor}
            emissive={circleEmissive}
            emissiveIntensity={7}
          />
        </mesh>
        <mesh ref={smallTorusRef_1} position={[0, 3, 70]}>
          <torusGeometry
            args={
              [
                /* your torus args */
              ]
            }
          />
          <meshPhongMaterial color="#e303fc" emissive="#ff87f1" />
        </mesh>
        <mesh ref={smallTorusRef_2} position={[-5, 3, 70]}>
          <torusGeometry
            args={
              [
                /* your torus args */
              ]
            }
          />
          <meshPhongMaterial color="#fac90a" emissive="#ffe78a" />
        </mesh>
        <Floor rotation={[Math.PI / -2, 0, 0]} color="#c7b6de" />
      </Physics>
    </>
  );
}

interface CirclesProps {
  ready: boolean;
  audio: HTMLAudioElement;
}

//#3b3b6e #eeccff #ffffff #a293c9 #696082 백그라운드와 포그 색상은 같게
export default function Circles({ ready, audio }: CirclesProps) {
  const [canvasReady, setCanvasReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const joysticRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    /** ============ set screensize =============== */
    function setScreenSize() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    /** ====== Generate a resize event if the device doesn't do it ====== */
    window.addEventListener(
      "orientationchange",
      () => window.dispatchEvent(new Event("resize")),
      false,
    );
    window.addEventListener("resize", setScreenSize);
    window.dispatchEvent(new Event("resize"));

    return () => {
      window.removeEventListener(
        "orientationchange",
        () => window.dispatchEvent(new Event("resize")),
        false,
      );
      window.removeEventListener("resize", setScreenSize);
    };
  }, []);

  return (
    <>
      <div
        style={{
          position: "absolute",
          height: "calc(var(--vh, 1vh) * 100)",
          width: "100vw",
          margin: "0px",
          opacity: ready ? "1" : "0",
        }}
      >
        <div style={{ width: "100%", height: "100%", position: "absolute" }}>
          <div
            ref={joysticRef}
            style={{
              width: "100px",
              height: "100px",
              position: "absolute",
              right: "3%",
              bottom: "3%",
            }}
          />
        </div>

        <Canvas
          ref={canvasRef}
          linear
          dpr={[2, 4]}
          onCreated={({ gl, camera, scene }) => {
            // gl.setClearColor(new THREE.Color('#1d1052'))
            if (gl && camera && scene) {
              setCanvasReady(true);
            }
          }}
        >
          <color attach="background" args={["#a293c9"]} />
          <fog args={[0xffffff, 10, 300]} attach="fog" />

          {ready && <CircleScene audio={audio} joysticRef={joysticRef} />}

          {canvasReady && <ManualComposer />}
        </Canvas>
      </div>
    </>
  );
}
