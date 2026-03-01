"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import useMemoApp from "../_hooks/use-memo-app";
import MemoAsideHeader from "./memo-aside-header";
import MemoUl from "./memo-ul";

function MemoAside() {
	const { isMobileMenuOpen, toggleMobileMenu, isMobile } = useMemoApp();

	return (
		<aside
			className={cn(
				"relative inset-0 z-1002 h-svh w-full max-w-[240px] rounded-lg bg-white shadow transition-all sm:h-[500px] sm:content-start sm:overflow-y-auto sm:border-r-[#E6E6E6]",
				isMobileMenuOpen ? "block" : "hidden",
				!isMobile && "block",
			)}
		>
			<button
				type="button"
				className="fixed top-[9px] left-[9px] z-1002 block cursor-pointer p-1.5 sm:hidden"
				onClick={toggleMobileMenu}
			>
				<Menu className="size-4 text-black" />
			</button>

			<MemoAsideHeader />
			<MemoUl />
		</aside>
	);
}

export default MemoAside;
