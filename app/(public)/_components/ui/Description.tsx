"use client";

import type { Desc } from "@/types/project.types";
import cn from "@/utils/common/cn";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

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

function Description({
  mode,
  jsonObject,
  handleClick,
  selectedIndex,
}: DescriptionProps) {
  return (
    <div className="flex flex-col w-full gap-4">
      <h3 className="font-bold m-0 text-neutral-900 dark:text-neutral-50 text-sm">
        {title[mode]}
      </h3>
      <ul className="flex flex-col gap-0.5">
        {jsonObject?.map((stack, index) => (
          <div className="flex flex-col gap-2" key={stack?.subTitle}>
            <li
              onKeyDown={(e) => {
                if (e.key === "Enter") handleClick(index);
              }}
              className="flex gap-2 justify-start items-center cursor-pointer text-xs"
              onClick={() => handleClick(index)}
            >
              {selectedIndex?.includes(index) ? (
                <IoIosArrowDown />
              ) : (
                <IoIosArrowForward />
              )}
              {stack?.subTitle}
            </li>

            <p
              className={cn(
                "text-xs text-left pl-1 break-keep pb-2",
                selectedIndex?.includes(index) ? "block" : "hidden",
              )}
            >
              {stack?.subContent}
            </p>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Description;
