"use client";
import React, { useCallback, useEffect, useState } from "react";

type UseTapScrollProps = {
    refs: React.RefObject<HTMLElement>[];
};

export function useTapScroll({ refs }: UseTapScrollProps) {
    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
    const [isOverflowing, setIsOverflowing] = useState<boolean[]>([]);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1280);

            // 각 ref의 overflow 상태를 확인합니다.
            const overflowStates = refs.map((ref) => {
                if (ref.current) {
                    return ref.current.scrollWidth > ref.current.clientWidth;
                }
                return false;
            });
            setIsOverflowing(overflowStates);
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check on mount

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [refs]);

    // Handlers for arrow buttons on desktop, with specific ref
    const createScrollHandler = useCallback(
        (ref: React.RefObject<HTMLElement>, direction: "left" | "right") => {
            if (!isDesktop) return () => {};

            return () => {
                if (ref.current) {
                    const scrollAmount = direction === "left" ? -500 : 500;
                    ref.current.scrollBy({
                        left: scrollAmount,
                        behavior: "smooth",
                    });
                }
            };
        },
        [isDesktop]
    );

    // 특정 ref가 overflow 상태일 때만 스크롤 핸들러를 반환
    const getScrollHandlers = (index: number) => {
        if (!isDesktop || !isOverflowing[index]) return null;

        const ref = refs[index];
        return {
            createScrollLeft: () => createScrollHandler(ref, "left"),
            createScrollRight: () => createScrollHandler(ref, "right"),
        };
    };

    const scrollHandlers = getScrollHandlers(0);

    return isDesktop ? { scrollHandlers } : null;
}
