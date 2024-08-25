"use client"

import { useEffect, useState } from "react";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

function DarkLightModeButton() {

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
        <button onClick={toggleTheme} className="text-3xl">
            {theme === "dark" ? <MdOutlineDarkMode /> : <MdDarkMode />}
        </button>
    )
}

export default DarkLightModeButton