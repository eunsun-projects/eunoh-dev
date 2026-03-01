"use client";

import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import useMemoApp from "../_hooks/use-memo-app";

function MemoAsideHeader() {
	const [id, setId] = useQueryState("id");

	const {
		memos,
		selected,
		createMemo,
		deleteMemo,
		selectMemo,
		isMobileMenuOpen,
	} = useMemoApp();

	// 새로 추가하기 했을때 0번 배열 선택용
	const first = memos[0];

	// 추가하기 버튼 클릭시 빈 스트링으로 메모 create
	const handleAddButtonClick = () => {
		createMemo("");
	};

	// 삭제 버튼 클릭시 현재 메모 삭제
	const handleDeleteButtonClick = () => {
		deleteMemo(selected);
	};

	// 메모 추가되어서 배열 길이 바뀔때마다 === first 가 바뀔때 마다
	// 주소에 추가된 메모의 아이디 값 적용
	useEffect(() => {
		setId(first.id);
	}, [first, setId]);

	// if(id) 여기서, 로더에서 반환한 "" 빈스트링은 falsy 로 취급되므로,
	// id 가 정확할때만 selectMemo 함
	useEffect(() => {
		if (id) selectMemo(id);
	}, [id, selectMemo]);

	return (
		<header
			className={cn(
				"sticky top-0 flex w-full items-center justify-between rounded-tl-0 border-b border-b-[#E6E6E6] bg-white px-4 py-3 sm:rounded-tl-[10px]",
				isMobileMenuOpen && "pl-12",
			)}
		>
			<button
				type="button"
				className="cursor-pointer bg-white px-1 py-0.5 font-[500] text-[12px] transition-all hover:font-semibold hover:text-[#121212] sm:px-2 sm:py-1 sm:font-semibold sm:text-[13px]"
				onClick={handleAddButtonClick}
			>
				{isMobileMenuOpen ? "새 메모" : "새 메모 작성하기"}
			</button>
			<button
				type="button"
				className="cursor-pointer bg-white px-1 py-0.5 font-[500] text-[12px] transition-all hover:font-semibold hover:text-[#121212] sm:px-2 sm:py-1 sm:font-semibold sm:text-[13px]"
				onClick={handleDeleteButtonClick}
			>
				삭제
			</button>
		</header>
	);
}

export default MemoAsideHeader;
