"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  Md360,
  MdBlurOn,
  MdClear,
  MdContrast,
  MdGraphicEq,
  MdGridOn,
  MdGridView,
  MdLightbulbOutline,
  MdOutlineHighlight,
  MdOutlineWbIridescent,
  MdOutlineWbSunny,
  MdTripOrigin,
} from "react-icons/md";
import ViewerClass from "../_class/Viewer.class";
import styles from "../_styles/viewer.module.css";

const delay = 300; // 더블 탭으로 판단하기 위한 시간 간격(밀리초)

function ViewerTemplate() {
  const appRef = useRef<ViewerClass | null>(null);
  const rafRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const guiMainRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const loadDivRef = useRef<HTMLDivElement>(null);
  const lastTapTime = useRef<number>(0);
  const idleTime = useRef<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isExistFile = useRef<boolean>(false);

  const onOff = (target: HTMLElement) => {
    const rightIcon = document.querySelectorAll(".xyzright");
    rightIcon.forEach((el) => {
      el.classList.remove(styles.xyzon);
    });
    target.classList.add(styles.xyzon);
  };

  const toggle = (target: HTMLElement) => {
    const rightIcon = document.querySelectorAll(".xyzright");
    if (target.classList.value.includes(styles.xyzon)) {
      rightIcon.forEach((el) => {
        el.classList.remove(styles.xyzon);
      });
      appRef.current?.removeLight();
    } else {
      onOff(target);
      if (target.dataset.ui) appRef.current?.lightModeChange(target.dataset.ui);
    }
  };

  const handleLightClick = (e: React.MouseEvent<SVGElement>) => {
    if (appRef.current) {
      if (e.currentTarget instanceof SVGElement) {
        const target = e.currentTarget as unknown as HTMLElement;
        switch (target.dataset.ui) {
          case "360":
            appRef.current.toggleRotation(target);
            break;
          case "wb_sunny":
            console.log(target);
            toggle(target);
            break;
          case "wb_iridescent":
            toggle(target);
            break;
          case "lightbulb":
            toggle(target);
            break;
          case "highlight":
            toggle(target);
            break;
          case "grid_on":
            appRef.current?.toggleWireframe(target);
            break;
          case "contrast":
            appRef.current?.toggleMap(target);
            break;
          case "trip_origin":
            appRef.current?.toggleReflection(target);
            break;
          case "grid_view":
            appRef.current?.togglePixelate(target);
            break;
          case "graphic_eq":
            appRef.current?.toggleGlitch(target);
            break;
          case "blur_on":
            appRef.current?.toggleDotScreen(target);
            break;
        }
      }
    } else {
      console.log("not ready!");
      return;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (appRef.current !== undefined && appRef.current !== null) {
      if (appRef.current.nowLoading === 0 || e.detail === 2) {
        alert("좀 천천히하셈");
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - lastTapTime.current;

    if (timeDifference < delay && timeDifference > 0) {
      alert("좀 천천히하셈");
    } else {
      if (appRef.current?.nowLoading === 0) {
        alert("좀 천천히하셈");
      }
    }
    lastTapTime.current = currentTime; // 마지막 탭 시간을 현재 시간으로 업데이트
  };

  const idleTimeReset = () => {
    idleTime.current = 0;
    console.log("idleTime reset");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      !confirm(
        "오브젝트 파일엔 반드시 텍스처가 포함되어 있어야 합니다. 계속하시겠습니까?",
      )
    ) {
      return;
    }
    if (isExistFile.current) {
      if (!confirm("새 모델을 로드하시겠습니까?")) {
        return;
      }
    }
    const file = e.target.files?.[0];
    if (!file) return;
    if (!appRef.current) return;

    const maxSize = 15 * 1024 * 1024; // 15MB 제한
    if (file.size > maxSize) {
      alert("파일첨부 사이즈는 15MB 이내로 가능합니다.");
      return;
    }
    isExistFile.current = true;
    // 기존 모델 정리
    appRef.current.modelDispose();

    // 파일 확장자 판단
    const type = file.name.split(".").pop();

    // 로더 설정
    if (type === "gltf" || type === "glb") {
      appRef.current.setupLoader("gltf");
    } else if (type === "obj") {
      appRef.current.setupLoader("obj");
    } else if (type === "fbx") {
      appRef.current.setupLoader("fbx");
    }

    // **Blob URL 생성**
    const objectURL = URL.createObjectURL(file);

    // 이 URL을 setupModel로 전달
    appRef.current.setupModel({
      obj: objectURL,
      type: type as "gltf" | "obj" | "fbx",
    });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (canvasRef.current && overlayRef.current && loadDivRef.current) {
      appRef.current = new ViewerClass(
        canvasRef.current,
        overlayRef.current,
        loadDivRef.current,
      );

      window.onresize = appRef.current.resize.bind(appRef.current);
      appRef.current.resize();

      const animate = () => {
        appRef.current?.render(); // 실제 렌더링 함수
        rafRef.current = requestAnimationFrame(animate);
      };
      animate();
    }
    document.body.addEventListener("click", idleTimeReset);

    intervalRef.current = setInterval(() => {
      idleTime.current = idleTime.current + 1;
      if (idleTime.current >= 3) {
        // 3 minutes
        console.log("reload!");
        // router.push("/sonny");
      }
    }, 60000);

    document.documentElement.style.overscrollBehavior = "none";

    return () => {
      document.documentElement.style.overscrollBehavior = "auto";
      document.body.removeEventListener("click", idleTimeReset);
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.onresize = null;
      appRef.current?.destroy();
    };
  }, []);

  return (
    <div className={styles.guiMain3d} ref={guiMainRef}>
      <div className={styles.temporal} ref={overlayRef} />
      <div className={styles.xyzNoneLandscape}>
        <h3>Looks good in portrait mode!</h3>
      </div>
      <div
        onKeyDown={(e) => {
          if (e.key === "Enter")
            handleMouseDown(e as unknown as React.MouseEvent<HTMLDivElement>);
        }}
        className={styles.guiWrapper3d}
        onClick={handleMouseDown}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.top3d}>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
            accept=".glb,.gltf,.fbx,.obj"
          />
          <button
            type="button"
            className={styles.upload}
            onClick={() => fileInputRef.current?.click()}
          >
            upload
          </button>
          <Link href="/tests">
            <MdClear className="xyzright w-6 h-6 cursor-pointer select-all pointer-events-auto" />
          </Link>
        </div>

        <div className={styles.mid3d}>
          <div className={styles.midLeft3d} />
          <div className={styles.midRight3d} />
          <div className={styles.xyzLoading} ref={loadDivRef} />
        </div>

        <div className={styles.btm3d}>
          <div className={styles.btmLeft3d} />
          <div className={styles.btmRight3d}>
            <Md360
              className="xyzright w-6 h-6 cursor-pointer"
              data-ui="360"
              onClick={handleLightClick}
            />
            <MdOutlineWbSunny
              className="xyzright w-6 h-6 cursor-pointer"
              data-ui="wb_sunny"
              onClick={handleLightClick}
            />
            <MdOutlineWbIridescent
              className="xyzright w-6 h-6 cursor-pointer"
              data-ui="wb_iridescent"
              onClick={handleLightClick}
            />
            <MdLightbulbOutline
              className="xyzright w-6 h-6 cursor-pointer"
              data-ui="lightbulb"
              onClick={handleLightClick}
            />
            <MdOutlineHighlight
              className="xyzright w-6 h-6 cursor-pointer"
              data-ui="highlight"
              onClick={handleLightClick}
            />
            <MdGridOn
              className="xyzview w-6 h-6 cursor-pointer"
              data-ui="grid_on"
              onClick={handleLightClick}
            />
            <MdContrast
              className="xyzview w-6 h-6 cursor-pointer"
              data-ui="contrast"
              onClick={handleLightClick}
            />
            <MdTripOrigin
              className="xyzview w-6 h-6 cursor-pointer"
              data-ui="trip_origin"
              onClick={handleLightClick}
            />
            <MdGridView
              className="xyzeffects w-6 h-6 cursor-pointer"
              data-ui="grid_view"
              onClick={handleLightClick}
            />
            <MdGraphicEq
              className="xyzeffects w-6 h-6 cursor-pointer"
              data-ui="graphic_eq"
              onClick={handleLightClick}
            />
            <MdBlurOn
              className="xyzeffects w-6 h-6 cursor-pointer"
              data-ui="blur_on"
              onClick={handleLightClick}
            />
          </div>
        </div>
      </div>
      <div className={styles.xyzCanvas} ref={canvasRef} />
    </div>
  );
}

export default ViewerTemplate;
