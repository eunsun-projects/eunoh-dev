"use client";

import { useUiStateContext } from "@/contexts/UiState.context";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import AboutMe from "./AboutMe";
import Hello from "./Hello";

function MainComponent() {
    const { mainReady } = useUiStateContext();
    const [showHello, setShowHello] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                // 스크롤 위치에 따라 값 조정
                setShowHello(false);
            } else {
                setShowHello(true);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <main
            className={twMerge(
                "h-dvh flex flex-col items-center justify-center dark:bg-gray-900 dark:text-white",
                mainReady && "h-auto"
            )}
        >
            <div
                className={twMerge(
                    "transition-opacity duration-1000",
                    showHello ? "opacity-100" : "opacity-0"
                )}
            >
                <Hello />
            </div>
            <AboutMe />
        </main>
    );
}

export default MainComponent;
