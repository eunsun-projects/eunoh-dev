"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaAt, FaGithub } from "react-icons/fa";
import { SiTistory } from "react-icons/si";

interface LinksProps {
  ready: boolean;
}

function Links({ ready }: LinksProps) {
  return (
    <div
      className={cn(
        "w-full opacity-0 flex flex-row gap-1 xl:gap-2 items-center justify-end left-2 transition-all duration-1000 text-xs xl:text-sm",
        ready && "opacity-100",
      )}
    >
      <Link
        href="mailto:bdohhhhh@gmail.com"
        className="p-0.5 dark:hover:bg-neutral-500 hover:bg-neutral-300 text-neutral-900 dark:text-neutral-50 hover:rounded-sm transition-all duration-200"
      >
        <FaAt />
      </Link>
      <Link
        href="https://github.com/eunohhh"
        className="p-0.5 dark:hover:bg-neutral-500 hover:bg-neutral-300 text-neutral-900 dark:text-neutral-50 hover:rounded-sm transition-all duration-200"
        target="_blank"
      >
        <FaGithub />
      </Link>
      <Link
        href="https://ifelseif.tistory.com"
        className="p-0.5 dark:hover:bg-neutral-500 hover:bg-neutral-300 text-neutral-900 dark:text-neutral-50 hover:rounded-sm transition-all duration-200"
        target="_blank"
      >
        <SiTistory className="text-[11px] xl:text-sm" />
      </Link>
    </div>
  );
}

export default Links;
