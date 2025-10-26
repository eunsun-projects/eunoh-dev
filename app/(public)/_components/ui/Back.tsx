"use client";

import { usePathname, useRouter } from "next/navigation";
import { RiArrowGoBackFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import DarkLightModeButton from "./DarkLightModeButton";

interface BackProps {
	className?: string;
	iconClassName?: string;
	isDarkLightModeButton?: boolean;
}

function Back({ className, iconClassName, isDarkLightModeButton }: BackProps) {
	const router = useRouter();
	const pathname = usePathname();

	const handleBack = () => {
		if (pathname === "/tests") {
			router.push("/");
		} else {
			// 브라우저 히스토리가 있는지 확인
			if (window.history.length > 1) {
				router.back();
			} else {
				// 히스토리가 없으면 홈으로 이동
				router.push("/");
			}
		}
	};

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<RiArrowGoBackFill
				className={cn("cursor-pointer text-lg", iconClassName)}
				onClick={handleBack}
			/>
			{isDarkLightModeButton && <DarkLightModeButton />}
		</div>
	);
}

export default Back;
