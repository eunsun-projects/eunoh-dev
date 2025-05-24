import { useEffect, useRef } from "react";

export default function useClickSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/assets/paradise/click_basic.mp3");
    audioRef.current.volume = 0.5;
    audioRef.current.load();

    return () => {
      audioRef.current = null;
    };
  }, []);

  const playSound = () => {
    audioRef.current?.play();
  };

  return playSound;
}
