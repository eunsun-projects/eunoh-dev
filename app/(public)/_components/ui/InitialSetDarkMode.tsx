'use client';
import { useEffect } from 'react';

function InitialSetDarkMode() {
  useEffect(() => {
    // 사용자의 OS 설정에 따라 다크 모드 적용
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  return <></>;
}

export default InitialSetDarkMode;
