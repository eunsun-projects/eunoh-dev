"use client";

import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useMemoApp from "../_hooks/use-memo-app";
import type { Memo } from "../_types/memo.type";

interface MemoLiProps extends Memo {
	isSelected: boolean;
	onClick: () => void;
}

function MemoLi({ contents, time, isSelected, onClick }: MemoLiProps) {
	const [defaultH6, setDefaultH6] = useState(
		contents.length > 14 ? `${contents.slice(0, 15)}...` : contents,
	);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
		if (e.key === "Enter") {
			onClick();
		}
	};

	useEffect(() => {
		setDefaultH6(
			contents.length > 14 ? `${contents.slice(0, 15)}...` : contents,
		);
	}, [contents]);

	return (
		<li
			className={cn(
				"h-14 w-full cursor-pointer rounded-sm p-2 text-[13px]",
				isSelected ? "bg-[#FFE07F]" : "bg-white",
			)}
			onKeyDown={handleKeyDown}
			onClick={onClick}
		>
			<h6 className="mx-0 mt-0 mb-0.5 overflow-hidden truncate font-bold text-[13px] text-black">
				{defaultH6}
			</h6>
			<span className="text-[#404040] text-[12px]">{time.slice(12)}</span>
		</li>
	);
}

function MemoUl() {
	const { memos, selected, selectMemo, closeMobileMenu } = useMemoApp();
	const [_, setId] = useQueryState("id");

	// li 클릭시 메모 선택하면서, 주소도 /memoId 로 변경
	const handleClick = (id: string) => () => {
		selectMemo(id);
		setId(id);
		closeMobileMenu(); // 모바일에서 메모 선택 시 메뉴 닫기
	};

	return (
		<ul className="m-0 grid grid-cols-1 content-start gap-2 overflow-x-hidden p-3">
			{memos.map((memo) => (
				<MemoLi
					key={memo.id}
					id={memo.id}
					contents={memo.contents}
					time={memo.time}
					isSelected={memo.id === selected}
					onClick={handleClick(memo.id)}
				/>
			))}
		</ul>
	);
}

export default MemoUl;
