"use client";

import { useUiStateContext } from "@/contexts/UiState.context";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { SiTistory } from "react-icons/si";
import { twMerge } from "tailwind-merge";

function Links() {
    const { mainReady } = useUiStateContext();

    return (
        <div
            className={twMerge(
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
