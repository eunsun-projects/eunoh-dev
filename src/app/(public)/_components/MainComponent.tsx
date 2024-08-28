"use client";

import { useUiState } from "@/hooks/ui/useUiState";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import AboutMe from "./AboutMe";
import Hello from "./Hello";
import SkillsAndTools from "./SkillsAndTools";

function MainComponent() {
    const { mainReady } = useUiState();
    const [showHello, setShowHello] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
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
            <SkillsAndTools />
        </main>
    );
}

export default MainComponent;
