"use client";

import { useUiStateContext } from "@/contexts/UiState.context";
import { useEffect, useState } from "react";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { twMerge } from "tailwind-merge";

function DarkLightModeButton() {
    const { mainReady } = useUiStateContext();
    const [theme, setTheme] = useState<string | null>(null);

    useEffect(() => {
        // 페이지 로드 시 현재 테마 설정을 가져옴
        const currentTheme = localStorage.getItem("theme");
        setTheme(currentTheme);
    }, []);

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

    return (
        <div
            className={twMerge(
                "absolute opacity-0 top-2 right-2 transition-all duration-1000 text-black dark:text-white",
                mainReady && "opacity-100"
            )}
        >
            <button onClick={toggleTheme} className="text-3xl">
                {theme === "dark" ? <MdOutlineDarkMode /> : <MdDarkMode />}
            </button>
        </div>
    );
}

export default DarkLightModeButton;
