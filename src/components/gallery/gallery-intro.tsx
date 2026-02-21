"use client";

import { useEffect } from "react";
import { useGallery } from "./gallery-loading-context";

interface VasIntroProps {
	title: string;
	minCount: number;
}

function GalleryIntro({ title, minCount }: VasIntroProps) {
	const { counter, pauseActions, isPaused } = useGallery();

	// 버튼에 포커스가 없어도 Enter/Space로 인트로 해제되도록 전역 리스너 등록
	useEffect(() => {
		if (!isPaused) return;
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				pauseActions.setUnpaused();
			}
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [isPaused, pauseActions]);

	if (!isPaused) return null;

	return (
		<div
			className="absolute top-1/2 left-1/2 z-1010 h-fit w-[90svw] -translate-x-1/2 -translate-y-1/2 border-2 border-white bg-transparent text-center text-[1.2rem] opacity-100 sm:w-[40svw]"
			style={{
				animation: "fadeIn 1s ease-in",
			}}
		>
			<div className="bg-neutral-500/40 p-4 backdrop-blur-sm">
				<div
					className="flex translate-y-5 flex-col items-center justify-center gap-2 p-2"
					style={{
						animation: "fadeInSlideUp 1s ease-in",
					}}
				>
					<div>
						<h1 className="font-bold text-[1.6rem] text-shadow-lg text-white tracking-[0.25rem]">
							{title}
						</h1>
					</div>

					<div className="mb-[0.75rem] text-[1.1rem] text-white">
						<p>♥♡♥♡♥♡</p>
						<p>방향키 혹은 W,A,S,D 키를</p>
						<p>이용해 이동이 가능합니다</p>
						<p>화면클릭 혹은 터치로 둘러볼 수 있습니다</p>
					</div>

					<button
						type="button"
						className="mt-4 mb-5 cursor-pointer border-2 border-white bg-transparent px-6 py-2 text-[1.4rem] text-white transition-all duration-300 hover:shadow-[0_0_10px_#fff]"
						onClick={pauseActions.setUnpaused}
					>
						{counter >= minCount ? "ENTER" : "loading"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default GalleryIntro;
