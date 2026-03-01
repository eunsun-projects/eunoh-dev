"use client";

import { debounce } from "lodash";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useMemoApp from "../_hooks/use-memo-app";
import { getTime } from "../_libs/reducer";

function MemoArticle() {
	const { memos, selected, updateMemo, toggleMobileMenu } = useMemoApp();
	const [text, setText] = useState("");
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

	// ref 사용하여 debounce wait 밀리세컨드 체크가 중복되지 않도록 처리
	const debouncedUpdateMemo = useRef<(input: string) => void>(
		debounce((input: string) => {
			updateMemo(input);
		}, 200),
	).current;

	// 제어컴포넌트 제어를 위해 setText 하고 업데이트메모 호출
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const input = e.target.value;
		setText(input);
		debouncedUpdateMemo(input);
	};

	// selected 가 변경되면(Ul컴포넌트 에서) 선택된 메모 찾아서
	// text 값 바꿔서 제어컴포넌트가 선택된 내용을 렌더링 할 수 있게 함
	useEffect(() => {
		const selectedMemo = memos.find((memo) => memo.id === selected);
		if (selectedMemo) {
			setText(selectedMemo.contents);
		}
	}, [memos, selected]);

	// 처음에 textArea 에 포커스
	useEffect(() => {
		if (textAreaRef.current) textAreaRef.current.focus();
	}, []);

	return (
		<article className="flex w-full flex-col p-4 sm:h-full sm:p-5">
			<button
				type="button"
				className="fixed top-[9px] left-[9px] z-1002 block cursor-pointer p-1.5 sm:hidden"
				onClick={toggleMobileMenu}
			>
				<Menu className="size-4 text-black" />
			</button>
			<span className="mx-auto mb-4 text-[#808080] text-[9px] sm:mb-6 sm:text-[10px]">
				{getTime()}
			</span>
			<textarea
				id="memo"
				name="memo"
				className="flex h-full grow-1 resize-none text-[16px] text-black leading-[1.5] focus-visible:outline-none sm:text-[15px] sm:leading-[1.66]"
				ref={textAreaRef}
				onChange={handleChange}
				value={text}
			/>
		</article>
	);
}

export default MemoArticle;
