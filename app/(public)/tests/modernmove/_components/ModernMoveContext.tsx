'use client';

import { createContext, RefObject, useContext, useRef, useState } from 'react';

export const modernMoveContext = createContext({
  play: false,
  threeD: true,
  meteor: {} as RefObject<boolean>,
  objet: false,
  audio: null as HTMLAudioElement | null,
  setPlay: (play: boolean) => {},
  setThreeD: (threeD: boolean) => {},
  setObjet: (objet: boolean) => {},
  setAudio: (audio: HTMLAudioElement | null) => {},
});

export const useModernMoveContext = () => {
  return useContext(modernMoveContext);
};

function ModernMoveProvider({ children }: { children: React.ReactNode }) {
  const [play, setPlay] = useState(false);
  const [threeD, setThreeD] = useState(true);
  const [objet, setObjet] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const meteorRef = useRef<boolean>(false);

  return (
    <modernMoveContext.Provider
      value={{
        play,
        threeD,
        meteor: meteorRef,
        objet,
        audio,
        setPlay,
        setThreeD,
        setObjet,
        setAudio,
      }}
    >
      {children}
    </modernMoveContext.Provider>
  );
}
export default ModernMoveProvider;
