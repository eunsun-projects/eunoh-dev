"use client";

import { useCallback, useEffect, useState } from "react";
import {
	IoMdArrowRoundBack,
	IoMdArrowRoundDown,
	IoMdArrowRoundForward,
	IoMdArrowRoundUp,
} from "react-icons/io";
import type Gallery from "@/lib/gallery/class/gallery.class";
import { cn } from "@/lib/utils";

interface GalleryKeyArrowsProps<T extends Gallery> {
	app: T;
	mobile: boolean;
}

function GalleryKeyArrows<T extends Gallery>({
	app,
	mobile,
}: GalleryKeyArrowsProps<T>) {
	const [keyPressed, setKeyPressed] = useState<string | null>(null);

	const handleDown = (e: React.MouseEvent<HTMLDivElement>) => {
		const target = e.target as HTMLElement;
		app.onMoveKeyDown(target.dataset.arrow);
		setKeyPressed(target.dataset.arrow as string);
	};

	const handleUp = (e: React.MouseEvent<HTMLDivElement>) => {
		const target = e.target as HTMLElement;
		app.onMoveKeyUp(target.dataset.arrow);
		setKeyPressed(null);
	};

	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		const target = e.target as HTMLElement;
		app.onMoveKeyDown(target.dataset.arrow);
		setKeyPressed(target.dataset.arrow as string);
	};

	const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
		const target = e.target as HTMLElement;
		app.onMoveKeyUp(target.dataset.arrow);
		setKeyPressed(null);
	};

	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === "ArrowUp" || e.key === "w" || e.key === "ㅈ") {
			setKeyPressed("ArrowUp");
		} else if (e.key === "ArrowDown" || e.key === "s" || e.key === "ㄴ") {
			setKeyPressed("ArrowDown");
		} else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "ㅁ") {
			setKeyPressed("ArrowLeft");
		} else if (e.key === "ArrowRight" || e.key === "d" || e.key === "ㅇ") {
			setKeyPressed("ArrowRight");
		} else if (e.key === " ") {
			setKeyPressed("space");
		}
	}, []);

	const handleKeyUp = useCallback(() => {
		setKeyPressed(null);
	}, []);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [handleKeyUp, handleKeyDown]);

	return (
		<div
			className={cn(
				"fixed right-5 bottom-5 z-1010 m-auto flex h-auto w-auto flex-col flex-wrap items-center justify-center text-center align-content-flex-start",
				mobile && "right-4 bottom-3",
			)}
			onMouseDown={handleDown}
			onMouseUp={handleUp}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			<div
				className={cn(
					"user-select-none gallery-key-arrows m-1 flex h-9 w-9 cursor-pointer items-center justify-center border-2 border-white bg-slate-300/40 text-center text-2xl text-white transition-all duration-50",
					keyPressed === "ArrowUp" && "pressed",
				)}
				style={{
					position: "relative",
					top: "-4px",
					display: mobile ? "none" : "flex",
				}}
				data-arrow="ArrowUp"
			>
				<IoMdArrowRoundUp
					className="font-semibold text-2xl leading-none"
					data-arrow="ArrowUp"
				/>
			</div>

			<div
				className="flex flex-row items-center justify-center"
				style={{ display: mobile ? "none" : "flex" }}
			>
				<button
					type="button"
					className={cn(
						"user-select-none gallery-key-arrows m-1 flex h-9 w-9 cursor-pointer items-center justify-center border-2 border-white bg-slate-300/40 text-center text-2xl text-white transition-all duration-50",
						keyPressed === "ArrowLeft" && "pressed",
					)}
					data-arrow="ArrowLeft"
				>
					<IoMdArrowRoundBack
						className="font-semibold text-2xl leading-none"
						data-arrow="ArrowLeft"
					/>
				</button>
				<button
					type="button"
					className={cn(
						"user-select-none gallery-key-arrows m-1 flex h-9 w-9 cursor-pointer items-center justify-center border-2 border-white bg-slate-300/40 text-center text-2xl text-white transition-all duration-50",
						keyPressed === "ArrowDown" && "pressed",
					)}
					data-arrow="ArrowDown"
				>
					<IoMdArrowRoundDown
						className="font-semibold text-2xl leading-none"
						data-arrow="ArrowDown"
					/>
				</button>
				<button
					type="button"
					className={cn(
						"user-select-none gallery-key-arrows m-1 flex h-9 w-9 cursor-pointer items-center justify-center border-2 border-white bg-slate-300/40 text-center text-2xl text-white transition-all duration-50",
						keyPressed === "ArrowRight" && "pressed",
					)}
					data-arrow="ArrowRight"
				>
					<IoMdArrowRoundForward
						className="font-semibold text-2xl leading-none"
						data-arrow="ArrowRight"
					/>
				</button>
			</div>

			<button
				type="button"
				className={cn(
					"user-select-none gallery-key-arrows z-1010 m-1 flex h-9 w-9 cursor-pointer items-center justify-center border-2 border-white bg-slate-300/40 text-center text-2xl text-white transition-all duration-50",
					keyPressed === "space" && "pressed",
				)}
				style={{
					width: mobile ? "70px" : "96%",
					height: "12px",
					marginTop: "6px",
				}}
				data-arrow="space"
			/>
		</div>
	);
}

export default GalleryKeyArrows;
