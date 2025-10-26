"use client";

import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { cn } from "@/lib/utils";

type NavigateProps = {
	mode: "before" | "after";
	onClick: () => void;
	className?: string;
};

const Navigate: React.FC<NavigateProps> = ({ mode, onClick, className }) => {
	return (
		<div
			className={cn(
				"absolute z-40 flex h-6 w-6 items-center justify-center text-black hover:text-primary-color-400",
				mode === "before"
					? "-left-[15px] -translate-y-[50%] top-[60%]"
					: "-right-[15px] -translate-y-[50%] top-[60%]",
				className,
			)}
		>
			<button
				type="button"
				id="navigate-button"
				className="flex h-full w-full items-center justify-center rounded-full bg-white shadow-md"
				onClick={onClick}
			>
				{mode === "before" ? <MdNavigateBefore /> : <MdNavigateNext />}
			</button>
		</div>
	);
};

export default Navigate;
