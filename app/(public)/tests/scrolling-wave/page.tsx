"use client";

import {
	motion,
	useMotionValueEvent,
	useScroll,
	useSpring,
	useTransform,
} from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const X_LINES = 40;

const PAGE_COUNT = 5;

const INITIAL_WIDTH = 20;

function ScrollingWavePage() {
	const { scrollYProgress } = useScroll();

	const clipPath = useTransform(
		scrollYProgress,
		[0, 1],
		["circle(0% at 50% 50%)", "circle(100% at 50% 50%)"],
	);
	const textValue = useSpring(0, { bounce: 0.1 });

	const calculateWidth = useCallback(
		(where: "left" | "right", scrollP: number) => {
			return Array.from({ length: X_LINES }).map((_, i) => {
				const percentilePosition =
					where === "left" ? 1 - (i + 1) / X_LINES : (i + 1) / X_LINES;
				return (
					INITIAL_WIDTH / 4 +
					40 * Math.cos(((percentilePosition - scrollP) * Math.PI) / 1.5) ** 32
				);
			});
		},
		[],
	);

	const [leftVarWidths, setLeftVarWidths] = useState<number[]>([]);
	const [rightVarWidths, setRightVarWidths] = useState<number[]>([]);

	// 새로고침시 하이드레이션 문제(width값 불일치)가 되기 때문에 useEffect를 사용하여 초기값을 설정합니다.
	useEffect(() => {
		setLeftVarWidths(calculateWidth("left", 0));
		setRightVarWidths(calculateWidth("right", 0));
	}, [calculateWidth]);

	useMotionValueEvent(scrollYProgress, "change", (scrollP) => {
		setLeftVarWidths(calculateWidth("left", scrollP));
		setRightVarWidths(calculateWidth("right", scrollP));
		if (scrollP > 0.7) {
			textValue.set(0);
		} else {
			textValue.set(300);
		}
	});

	return (
		<>
			<div className="pointer-events-none fixed inset-0 z-10 flex h-full w-full">
				<motion.div className="z-10 flex h-full w-full flex-col items-start justify-between">
					{leftVarWidths.length > 0 &&
						leftVarWidths.map((width, i) => (
							<motion.div
								key={i}
								className="h-[1vh] bg-slate-300"
								style={{
									width: `${width}px`,
								}}
							/>
						))}
				</motion.div>
				<motion.div className="z-10 flex h-full w-full flex-col items-end justify-between">
					{rightVarWidths.length > 0 &&
						rightVarWidths.map((width, i) => (
							<motion.div
								key={i}
								className="h-[1vh] bg-slate-300"
								style={{
									width: `${width}px`,
								}}
							/>
						))}
				</motion.div>
			</div>
			<motion.div
				className="fixed top-0 left-0 h-full w-full bg-orange-400"
				style={{ clipPath }}
			>
				<h1 className="pl-[8vw] font-bold text-[8vw] text-blue-600">
					<span className="block overflow-hidden">
						<motion.span className="block" style={{ y: textValue }}>
							Aha!
						</motion.span>
					</span>
					<span className="block overflow-hidden">
						<motion.span className="block" style={{ y: textValue }}>
							You found me!
						</motion.span>
					</span>
				</h1>
			</motion.div>
			{new Array(PAGE_COUNT).fill(null).map((_, index) => (
				<div className="h-dvh w-dvw bg-gray-700" key={index} />
			))}
		</>
	);
}

export default ScrollingWavePage;
