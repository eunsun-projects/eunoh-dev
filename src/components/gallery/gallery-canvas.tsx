"use client";

import type { JoystickManagerOptions } from "nipplejs";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Gallery from "@/lib/gallery/class/gallery.class";
import Sanctum from "@/lib/gallery/class/sanctum.class";
import SmallGallery from "@/lib/gallery/class/small-gallery.class";
import {
	galleryLights,
	galleryTextures,
} from "@/lib/gallery/data/gallery.data";
import {
	sanctumLights,
	sanctumModels,
	sanctumTextures,
} from "@/lib/gallery/data/sanctum.data";
import {
	smallGalleryLights,
	smallGalleryModels,
	smallGalleryTextures,
} from "@/lib/gallery/data/small-gallery.data";
import GalleryKeyArrows from "./gallery-key-arrows";
import { useGallery } from "./gallery-loading-context";
import useManager from "./hooks/use-manager";

interface VasCanvasProps {
	title: string;
}

function GalleryCanvas({ title }: VasCanvasProps) {
	const isMobile = useIsMobile();
	const [threeApp, setThreeApp] = useState<Gallery | Sanctum | null>(null);
	const [nipplejs, setNipplejs] = useState<typeof import("nipplejs") | null>(
		null,
	);
	const [options, setOptions] = useState<JoystickManagerOptions | null>(null);
	const { counter, loadingActions, infoActions, isPaused } = useGallery();

	const canvasDivRef = useRef<HTMLDivElement>(null);
	const joysticRef = useRef<HTMLDivElement>(null);
	const raf = useRef<number | null>(null);

	const manager = useManager({ isMobile, app: threeApp, nipplejs, options });

	useEffect(() => {
		let app: Gallery | Sanctum;
		if (!canvasDivRef.current) return;
		if (title === "sanctum") {
			app = new Sanctum({
				canvasdiv: canvasDivRef.current,
				title,
				actions: loadingActions,
				boolActions: infoActions,
				textures: sanctumTextures,
				paintings: [],
				models: sanctumModels,
				lights: sanctumLights,
			});
		} else if (title === "small-gallery") {
			app = new SmallGallery({
				canvasdiv: canvasDivRef.current,
				title,
				actions: loadingActions,
				boolActions: infoActions,
				textures: smallGalleryTextures,
				paintings: [],
				lights: smallGalleryLights,
				models: smallGalleryModels,
			});
		} else {
			app = new Gallery({
				canvasdiv: canvasDivRef.current,
				title,
				actions: loadingActions,
				boolActions: infoActions,
				textures: galleryTextures,
				paintings: [],
				models: [],
				lights: galleryLights,
			});
		}
		setThreeApp(app);
		// 초기화 및 설정 메소드 호출
		// vasApp.init(); // 초기화는 인스턴스 안에서
		app.addWorldLight(); // 빛 추가 시작
		app.addWallFloorCeiling(); // 벽 바닥 천장 추가 시작
		app.addModelAndLight(); // 모델 및 빛 추가 (있을경우) 시작
		app.addPaintings(); // 2d 작품 추가 (있을경우) 시작
		app.addPedestal(); // 좌대 추가 (true 인경우) 시작
		app.rotate(); // 화면 회전 기능 추가 시작
		app.onKeydownUp(); // 키보드로 이동기능 추가 시작

		// 이벤트 핸들러 등록
		window.onresize = app.resize.bind(app);
		// 초기 사이즈 조정
		app.resize();

		// 렌더링 루프 시작
		function animate() {
			app.render(); // 실제 렌더링 함수
			raf.current = requestAnimationFrame(animate);
		}
		animate();

		// 클린업 함수
		return () => {
			app.destroy();
			if (raf.current) {
				cancelAnimationFrame(raf.current);
			}
			window.onresize = null;
		};
	}, [infoActions, title, loadingActions]);

	useEffect(() => {
		if (isMobile) {
			const options = {
				zone: joysticRef.current,
				mode: "static",
				position: { right: "50%", bottom: "50%" },
				size: 70,
			} as JoystickManagerOptions;
			const nipplejs = require("nipplejs");
			setNipplejs(nipplejs);
			setOptions(options);
		}
	}, [isMobile]);

	useEffect(() => {
		if (counter > 0) {
			console.log(counter);
		}
	}, [counter]);

	return (
		<>
			<div
				style={{
					width: "100%",
					height: "100%",
					position: "absolute",
					pointerEvents: "none",
					zIndex: 1010,
					display: isMobile ? "block" : "none",
				}}
			>
				<div
					ref={joysticRef}
					style={{
						width: "100px",
						height: "100px",
						position: "absolute",
						pointerEvents: isPaused ? "none" : "all",
						right: "1%",
						bottom: "4%",
					}}
				/>
			</div>

			<div className="h-full w-full" ref={canvasDivRef} />

			{threeApp && <GalleryKeyArrows app={threeApp} mobile={isMobile} />}
		</>
	);
}
export default GalleryCanvas;
