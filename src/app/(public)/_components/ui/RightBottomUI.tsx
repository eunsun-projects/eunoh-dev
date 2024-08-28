"use client";

import { useUiState } from "@/hooks/ui/useUiState";
import { FaAngleUp } from "react-icons/fa";
import { IoChatboxEllipses, IoMail } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

function RightBottomUI() {
    const { mainReady } = useUiState();

    return (
        <div
            className={twMerge(
                "fixed opacity-0 bottom-2 right-2 flex flex-col gap-2 justify-center items-center transition-opacity duration-1000 z-50 text-lg xl:text-2xl",
                mainReady && "opacity-100"
            )}
        >
            <div className="rounded-full bg-white text-black flex justify-center items-center shadow-md p-1 lg:p-2">
                <IoMail className="cursor-pointer" />
            </div>
            <div className="rounded-full bg-white text-black flex justify-center items-center shadow-md p-1 lg:p-2">
                <IoChatboxEllipses className="cursor-pointer" />
            </div>
            <div className="rounded-full bg-white text-black flex justify-center items-center shadow-md p-1 lg:p-2">
                <FaAngleUp className="cursor-pointer" />
            </div>
        </div>
    );
}

export default RightBottomUI;
