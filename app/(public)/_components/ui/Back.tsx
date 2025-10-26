"use client";

import { usePathname, useRouter } from "next/navigation";
import { RiArrowGoBackFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import DarkLightModeButton from "./DarkLightModeButton";

interface BackProps {
	className?: string;
	isDarkLightModeButton?: boolean;
}

function Back({ className, isDarkLightModeButton }: BackProps) {
	const router = useRouter();
	const pathname = usePathname();

	const handleBack = () => {
		if (pathname === "/tests") router.push("/");
		router.back();
	};

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<RiArrowGoBackFill
				className="cursor-pointer text-lg"
				onClick={() => router.back()}
			/>
			{isDarkLightModeButton && <DarkLightModeButton />}
		</div>
	);
}

export default Back;
