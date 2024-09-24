"use client";

import { Desc } from "@/types/project.types";
import React from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { twMerge } from "tailwind-merge";

type DescriptionProps = {
    mode: "stacks" | "decisions" | "troubles";
    jsonObject: Desc[] | null;
    handleClick: (index: number) => void;
    selectedIndex: number[] | null;
};
const title = {
    stacks: "🧬 사용 기술",
    features: "🗝️ 주요 기능 및 특징",
    decisions: "🤔 기술적 의사결정",
    troubles: "💥 트러블 슈팅",
};

function Description({ mode, jsonObject, handleClick, selectedIndex }: DescriptionProps) {
    return (
        <div className="flex flex-col w-full gap-4 text-center">
            <h3 className="text-xl font-bold w-[95%] xl:w-[45%] text-left mx-auto">{title[mode]}</h3>
            <ul className="flex flex-col gap-2 w-[95%] xl:w-[45%] mx-auto">
                {jsonObject?.map((stack, index) => (
                    <React.Fragment key={stack?.subTitle}>
                        <li
                            className="flex gap-2 justify-start items-center cursor-pointer text-lg"
                            onClick={() => handleClick(index)}
                        >
                            {selectedIndex?.includes(index) ? <IoIosArrowDown /> : <IoIosArrowForward />}
                            {stack?.subTitle}
                        </li>

                        <p
                            className={twMerge(
                                "text-sm text-left pl-1",
                                selectedIndex?.includes(index) ? "block" : "hidden"
                            )}
                        >
                            {stack?.subContent}
                        </p>
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
}

export default Description;
