"use client";

import { useReadyState } from "@/hooks/ui/useReadyState";
import cn from "@/utils/common/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();
  const { isMainReady } = useReadyState();

  return (
    <footer
      className={cn(
        "opacity-0 max-w-[640px] mx-auto relative bottom-0 left-0 right-0 py-10 xl:py-[64px] flex items-center justify-between transition-opacity duration-1000",
        isMainReady && pathname === "/" && "opacity-100",
        pathname !== "/" && "opacity-100",
      )}
    >
      <p className="text-sm">
        {"2025 . "}
        <Link
          href="/"
          className="text-[13px] p-0.5 dark:hover:bg-neutral-500 hover:bg-neutral-300 hover:rounded-sm transition-all duration-200 text-neutral-900 dark:text-neutral-200"
        >
          오은
        </Link>
      </p>
      <p className="text-base">
        <Link
          href="https://github.com/eunsun-projects/eunoh-dev"
          target="_blank"
          className="p-0.5 dark:hover:bg-neutral-500 hover:bg-neutral-300 hover:rounded-sm transition-all duration-200 text-neutral-900 dark:text-neutral-200"
        >
          repo
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
