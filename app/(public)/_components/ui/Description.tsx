"use client";

import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { cn } from "@/lib/utils";
import type { Desc } from "@/types/project.types";

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
		<div className="flex w-full flex-col gap-4">
			<h3 className="m-0 font-bold text-neutral-900 text-sm dark:text-neutral-50">
				{title[mode]}
			</h3>
			<ul className="flex flex-col gap-0.5">
				{jsonObject?.map((stack, index) => (
					<div className="flex flex-col gap-2" key={stack?.subTitle}>
						<li
							onKeyDown={(e) => {
								if (e.key === "Enter") handleClick(index);
							}}
							className="flex cursor-pointer items-center justify-start gap-2 text-xs"
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
								"break-keep pb-2 pl-1 text-left text-xs",
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
