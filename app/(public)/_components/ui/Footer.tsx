'use client';

import { useReadyState } from '@/hooks/ui/useReadyState';
import cn from '@/utils/common/cn';
import Link from 'next/link';

function Footer() {
  const { isMainReady } = useReadyState();

  return (
    <footer
      className={cn(
        'opacity-0 max-w-[640px] mx-auto relative bottom-0 left-0 right-0 my-[64px] flex items-center justify-between transition-opacity duration-1000',
        isMainReady && 'opacity-100',
      )}
    >
      <p className="text-sm">
        {'2025 . '}
        <Link
          href="/"
          className="p-0.5 hover:bg-neutral-500 hover:rounded-sm transition-all duration-200 text-neutral-900 dark:text-neutral-200"
        >
          오은
        </Link>
      </p>
      <Link
        href="https://github.com/eunsun-projects/eunoh-dev"
        target="_blank"
        className="p-0.5 hover:bg-neutral-500 hover:rounded-sm transition-all duration-200 text-neutral-900 dark:text-neutral-200"
      >
        repo
      </Link>
    </footer>
  );
}

export default Footer;
