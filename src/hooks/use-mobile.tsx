import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * 모바일 여부를 반환합니다.
 * 초기 렌더(SSR/하이드레이션)에서는 `undefined`를 반환하며,
 * useEffect 이후 확정된 boolean 값을 반환합니다.
 */
export function useIsMobileState() {
	const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
		undefined,
	);

	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);

	return isMobile;
}

/** 모바일 여부를 boolean으로 반환합니다. (초기값 false) */
export function useIsMobile() {
	return !!useIsMobileState();
}
