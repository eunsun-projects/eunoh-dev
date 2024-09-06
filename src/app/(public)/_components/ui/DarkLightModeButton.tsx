"use client";

import { useUiState } from "@/hooks/ui/useUiState";
import { useEffect, useState } from "react";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { twMerge } from "tailwind-merge";

function DarkLightModeButton() {
    const { mainReady } = useUiState();
    const [theme, setTheme] = useState<string | null>(null);

    const toggleTheme = () => {
        if (theme === "dark") {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setTheme("light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        }
    };

    useEffect(() => {
        // 사용자의 OS 설정에 따라 다크 모드 적용
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setTheme("light");
        }
    }, []);

    return (
        <div
            className={twMerge(
                "fixed opacity-0 top-2 right-2 transition-all duration-1000 text-black dark:text-white z-50",
                mainReady && theme !== null && "opacity-100"
            )}
        >
            <button onClick={toggleTheme} className="text-3xl">
                {theme === "dark" ? <MdOutlineDarkMode /> : <MdDarkMode />}
            </button>
        </div>
    );
}

export default DarkLightModeButton;
