"use client";

import { useEffect, useRef } from "react";
import SmokeClass from "../_class/smokeClass";
import styles from "../_styles/paradise.module.css";
export default function Smoke() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const rafRef = useRef<number | null>(null);
	const canvasBoxRef = useRef<HTMLDivElement | null>(null);
	//raf = request animation frame

	useEffect(() => {
		if (!canvasRef.current || !canvasBoxRef.current) return;
		const smokeclass = new SmokeClass(canvasRef.current);
		const handler = () => {
			if (!canvasBoxRef.current) return;
			smokeclass.resize(canvasBoxRef.current);
		};
		//화면 리사이즈에 대비
		window.addEventListener("resize", handler);
		// window.onresize = smokeclass.resize(canvasRef.current)
		//시작 시 리사이즈 필수로 한번 호출
		smokeclass.resize(canvasBoxRef.current);

		//렌더링 루프 시작
		function animate() {
			smokeclass.render();
			rafRef.current = requestAnimationFrame(animate.bind(smokeclass)); //무한반복 함수가 됨
		}
		animate();

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, []);

	return (
		<div ref={canvasBoxRef} className={styles.smokecanvasbox}>
			<canvas className={styles.smokecanvas} ref={canvasRef} />
		</div>
	);
}
