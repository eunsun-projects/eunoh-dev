"use client";

import { type ChangeEvent, useId, useState } from "react";
import useToast from "../_hooks/use-toast";

function ToastController() {
	const { addToasts } = useToast();
	const titleId = useId();
	const contentId = useId();
	const timeId = useId();

	const [input, setInput] = useState({
		title: "토스트 생성!",
		content: `${Intl.DateTimeFormat("ko-KR", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
		}).format(new Date())}`,
		duration: 2000,
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const id = e.target.id;
		const value = e.target.value;

		switch (id) {
			case titleId:
				setInput({ ...input, title: value });
				break;
			case contentId:
				setInput({ ...input, content: value });
				break;
			case timeId:
				setInput({ ...input, duration: Number(value) });
				break;
		}
	};

	const handleClick = () => {
		addToasts(input);
	};

	return (
		<div className="grid grid-cols-1 gap-y-6 text-black">
			<h1 className="text-center font-semibold text-2xl text-black">
				토스트 컨트롤러
			</h1>
			<div className="flex flex-col gap-y-4">
				<div className="flex flex-col items-start gap-y-1.5">
					<label htmlFor={titleId} className="font-medium text-sm">
						{"제목 (필수)"}
					</label>
					<input
						id={titleId}
						className="w-80 rounded-md border px-4 py-2.5"
						value={input.title}
						onChange={handleInputChange}
					/>
				</div>
				<div className="flex flex-col items-start gap-y-1.5">
					<label htmlFor={contentId} className="font-medium text-sm">
						{"내용 (필수)"}
					</label>
					<input
						id={contentId}
						className="w-80 rounded-md border px-4 py-2.5"
						value={input.content}
						onChange={handleInputChange}
					/>
				</div>
				<div className="flex flex-col items-start gap-y-1.5">
					<label htmlFor={timeId} className="font-medium text-sm">
						{"노출 시간(ms) (선택)"}
					</label>
					<input
						id={timeId}
						className="w-80 rounded-md border px-4 py-2.5"
						type="number"
						value={input.duration}
						onChange={handleInputChange}
					/>
				</div>
			</div>
			<button
				onClick={handleClick}
				className="cursor-pointer rounded-md bg-black py-3 font-medium text-[15px] text-white transition hover:bg-black/80 active:bg-black/70"
				type="button"
			>
				토스트 띄우기
			</button>
		</div>
	);
}

export default ToastController;
