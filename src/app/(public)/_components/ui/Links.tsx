"use client";

import { useUiState } from "@/hooks/ui/useUiState";
import cn from "@/utils/common/cn";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { SiTistory } from "react-icons/si";

function Links() {
    const { mainReady } = useUiState();

    return (
        <div
            className={cn(
                "fixed opacity-0 top-2 flex flex-row gap-2 items-center justify-center left-2 transition-all duration-1000 text-black dark:text-white z-50",
                mainReady && "opacity-100"
            )}
        >
            <Link href="https://github.com/eunohhh">
                <FaGithub className="text-3xl" />
            </Link>
            <Link href="https://ifelseif.tistory.com">
                <SiTistory className="text-2xl" />
            </Link>
        </div>
    );
}

export default Links;
