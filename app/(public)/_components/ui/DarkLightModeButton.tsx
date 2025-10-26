"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { cn } from "@/lib/utils";

interface DarkLightModeButtonProps {
	ready?: boolean;
}

function DarkLightModeButton({ ready = true }: DarkLightModeButtonProps) {
	const [theme, setTheme] = useState<string>("dark");
	const pathname = usePathname();

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

	// useEffect(() => {
	//   // 사용자의 OS 설정에 따라 다크 모드 적용
	//   if (
	//     localStorage.theme === 'dark' ||
	//     (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
	//   ) {
	//     document.documentElement.classList.add('dark');
	//     localStorage.setItem('theme', 'dark');
	//     setTheme('dark');
	//   } else {
	//     document.documentElement.classList.remove('dark');
	//     localStorage.setItem('theme', 'light');
	//     setTheme('light');
	//   }
	// }, []);

	return (
		<div
			className={cn(
				"flex items-center justify-center text-xl opacity-0",
				ready && theme !== null && "opacity-100",
				pathname === "/" && "transition-all duration-1000",
			)}
		>
			<button type="button" onClick={toggleTheme} className="cursor-pointer">
				{theme === "dark" ? <MdOutlineDarkMode /> : <MdDarkMode />}
			</button>
		</div>
	);
}

export default DarkLightModeButton;
