"use client";

import { useEffect } from "react";

function OverScroll() {
	useEffect(() => {
		const root = document.documentElement;
		const body = document.body;

		const setOverscrollY = (value: "auto" | "none") => {
			root.style.overscrollBehaviorY = value;
			body.style.overscrollBehaviorY = value;
		};

		const updateForPosition = () => {
			const scrollTop = window.scrollY || 0;
			const scrollHeight =
				document.scrollingElement?.scrollHeight || root.scrollHeight || 0;
			const maxScroll = Math.max(0, scrollHeight - window.innerHeight);

			const threshold = 8; // 상/하단 근접 임계값
			const nearTop = scrollTop <= threshold;
			const nearBottom = scrollTop >= maxScroll - threshold;

			if (nearTop || nearBottom) {
				setOverscrollY("auto");
			} else {
				setOverscrollY("none");
			}
		};

		const onTouchStart = () => updateForPosition();
		const onTouchMove = () => updateForPosition();
		const onTouchEnd = () => setOverscrollY("auto");
		const onScroll = () => updateForPosition();

		window.addEventListener("touchstart", onTouchStart, { passive: true });
		window.addEventListener("touchmove", onTouchMove, { passive: true });
		window.addEventListener("touchend", onTouchEnd, { passive: true });
		window.addEventListener("touchcancel", onTouchEnd, { passive: true });
		window.addEventListener("scroll", onScroll, { passive: true });

		// 초기 상태는 자동, 이후 위치에 따라 갱신
		setOverscrollY("auto");
		updateForPosition();

		return () => {
			window.removeEventListener("touchstart", onTouchStart as EventListener);
			window.removeEventListener("touchmove", onTouchMove as EventListener);
			window.removeEventListener("touchend", onTouchEnd as EventListener);
			window.removeEventListener("touchcancel", onTouchEnd as EventListener);
			window.removeEventListener("scroll", onScroll as EventListener);
			setOverscrollY("auto");
		};
	}, []);

	return null;
}

export default OverScroll;
