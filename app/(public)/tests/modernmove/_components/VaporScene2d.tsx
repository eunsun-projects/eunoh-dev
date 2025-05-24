/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "../_styles/modern-move.module.css";
import { useModernMoveContext } from "./ModernMoveContext";

export default function VaporwaveScene2d({ ready }: { ready: boolean }) {
  const { threeD, audio, play } = useModernMoveContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const [earth, setEarth] = useState(false);
  const earthRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    if (ready) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
        console.log("Image loaded!");
        clearTimeout(timer);
      }, 1000);
    }
  };

  useEffect(() => {
    function recieve() {
      if (!earthRef.current || !audio) return;
      const curr = audio.currentTime;
      if (curr > 3 && curr < 3.3 && play) {
        setEarth(true);
      }
      if (curr > 9 && curr < 9.3 && play) {
        setEarth(false);
      }
    }

    if (audio) {
      audio.addEventListener("timeupdate", recieve);
    }

    return () => {
      audio?.removeEventListener("timeupdate", recieve);
    };
  }, [audio, play]);

  return (
    <motion.div
      className={styles.canvas2d}
      initial={{ opacity: 0 }}
      animate={{ opacity: threeD ? 0 : 1 }}
      transition={{ duration: 1 }}
      style={{ position: "absolute", zIndex: "1" }}
    >
      <motion.img
        ref={earthRef}
        src="/assets/modernmove/earth3.gif"
        style={{
          position: "absolute",
          top: "130px",
          zIndex: "2",
          opacity: earth ? "1" : "0",
        }}
        animate={{
          transform: earth ? "translateY(180px)" : "translateY(0px)",
        }}
        transition={{ duration: 7 }}
        alt="earth"
      />
      <img
        className={styles.canvas2dback}
        style={{ zIndex: "1" }}
        src="/assets/modernmove/momoback_sq.gif"
        alt="modernmove_2d"
        onLoad={handleImageLoad}
      />
    </motion.div>
  );
}
