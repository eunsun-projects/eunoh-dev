"use client";

import { useEffect, useRef } from "react";
import styles from "../_styles/modern-move.module.css";
import { useModernMoveContext } from "./ModernMoveContext";

export default function CustomAudio() {
  const { audio } = useModernMoveContext();
  const progressRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!progressRef.current || !audio) return;
    progressRef.current.style.width = "0%";

    const drawProgress = (currTime: number, totalTime: number) => {
      if (progressRef.current) {
        progressRef.current.style.width = `${(currTime / totalTime) * 100}%`;
      }
    };

    const timeupdateHandler = () => {
      const { currentTime, duration } = audio;
      drawProgress(currentTime, duration);
    };

    if (audio?.src) {
      audio.addEventListener("timeupdate", timeupdateHandler);
    }

    return () => {
      if (audio !== undefined) {
        audio.removeEventListener("timeUpdate", timeupdateHandler);
      }
    };
  }, [audio]);

  return (
    <div
      style={{
        height: "50px",
        color: "white",
        zIndex: "1000",
        position: "relative",
      }}
    >
      <div
        className={styles.progress_container}
        style={{ height: "0.3rem", width: "99%" }}
      >
        <span
          id="progress"
          ref={progressRef}
          style={{
            display: "block",
            position: "relative",
            height: "100%",
            backgroundColor: "aqua",
          }}
        />
      </div>
    </div>
  );
}
