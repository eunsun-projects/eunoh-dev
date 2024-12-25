'use client';

import { useEffect, useState } from 'react';
import { YuniverseBold } from './paradiseFonts';

export default function CheckLandscape() {
  const [islandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    function setLandscapeSetSreensize() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      // 가로가 세로보다 넓으면 === 랜드스케이프
      // 랜드스케이프 일때 세로의 최대길이가 711 이하면 === 갤탭 미만까지만 적용

      if (window.innerWidth >= window.innerHeight && window.innerHeight <= 711) {
        setIsLandscape(true);
      } else {
        setIsLandscape(false);
      }
    }

    // orientationchange 이벤트를 위한 resize 이벤트 트리거 함수
    function handleOrientationChange() {
      window.dispatchEvent(new Event('resize'));
    }

    /** ====== Generate a resize event if the device doesn't do it ====== */
    window.addEventListener('orientationchange', handleOrientationChange, false);
    window.addEventListener('resize', setLandscapeSetSreensize);
    window.dispatchEvent(new Event('resize'));

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange, false);
      window.removeEventListener('resize', setLandscapeSetSreensize);
    };
  }, []);

  return (
    <div
      className={YuniverseBold.className}
      style={{
        position: 'fixed',
        display: 'block',
        visibility: islandscape ? 'visible' : 'hidden',
        opacity: islandscape ? '1' : '0',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'black',
        color: 'white',
        fontSize: '1.4rem',
        zIndex: '999',
        transition: 'opacity 1s',
      }}
    >
      <p
        style={{
          position: 'relative',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        세로모드에 최적화되어 있습니다
      </p>
    </div>
  );
}
