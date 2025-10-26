"use client";

import { FaAngleUp } from "react-icons/fa";
import { useReadyState } from "@/hooks/ui/useReadyState";
import { cn } from "@/lib/utils";

// import { IoChatboxEllipses, IoMail } from "react-icons/io5";

function TopButton() {
	const { isMainReady: mainReady } = useReadyState();

	const handleScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div
			className={cn(
				"fixed right-2 bottom-2 z-40 flex flex-col items-center justify-center gap-2 text-lg opacity-0 transition-opacity duration-1000 xl:text-2xl",
				mainReady && "opacity-100",
			)}
		>
			{/* <div className="rounded-full bg-white text-black flex justify-center items-center shadow-md p-1 lg:p-2">
                <IoMail className="cursor-pointer" />
            </div>
            <div className="rounded-full bg-white text-black flex justify-center items-center shadow-md p-1 lg:p-2">
                <IoChatboxEllipses className="cursor-pointer" />
            </div> */}
			<button
				type="button"
				className="flex items-center justify-center rounded-full bg-white p-1 text-black shadow-md lg:p-2"
				onClick={handleScrollToTop}
			>
				<FaAngleUp className="cursor-pointer" />
			</button>
		</div>
	);
}

export default TopButton;
