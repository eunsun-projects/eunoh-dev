'use client';

import cn from '@/utils/common/cn';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';

interface DarkLightModeButtonProps {
  ready?: boolean;
}

function DarkLightModeButton({ ready = true }: DarkLightModeButtonProps) {
  const [theme, setTheme] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  useEffect(() => {
    // 사용자의 OS 설정에 따라 다크 모드 적용
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  }, []);

  return (
    <div
      className={cn(
        'opacity-0 flex items-center justify-center text-xl',
        ready && theme !== null && 'opacity-100',
        pathname === '/' && 'transition-all duration-1000',
      )}
    >
      <button onClick={toggleTheme}>
        {theme === 'dark' ? <MdOutlineDarkMode /> : <MdDarkMode />}
      </button>
    </div>
  );
}

export default DarkLightModeButton;
