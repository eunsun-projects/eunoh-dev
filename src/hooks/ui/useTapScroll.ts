"use client";
import React, { useCallback, useEffect, useState } from "react";

type UseTapScrollProps = {
    refs: React.RefObject<HTMLElement>[];
};

export function useTapScroll({ refs }: UseTapScrollProps) {
    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1280);
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check on mount

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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

    return isDesktop
        ? {
              createScrollLeft: (ref: React.RefObject<HTMLElement>) => createScrollHandler(ref, "left"),
              createScrollRight: (ref: React.RefObject<HTMLElement>) => createScrollHandler(ref, "right"),
          }
        : null;
}
