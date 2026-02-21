"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type GalleryInfoType = {
	title: string;
	artist: string;
	year: string;
	material: string;
	desc: string;
};

export type GalleryActions = {
	increase: () => void;
	decrease: () => void;
};

export type GalleryInfo = {
	open: boolean;
	info: GalleryInfoType;
};

export type GalleryInfoActions = {
	setTrue: (info: any) => void;
	setFalse: (info: any) => void;
};

export type GalleryPauseActions = {
	setPaused: () => void;
	setUnpaused: () => void;
};

export type GalleryContextType = {
	counter: number;
	loadingActions: GalleryActions;
	isInfoOpen: GalleryInfo;
	infoActions: GalleryInfoActions;
	isPaused: boolean;
	pauseActions: GalleryPauseActions;
};

export const GalleryContext = createContext<GalleryContextType>({
	counter: 0,
	loadingActions: {
		increase: () => {},
		decrease: () => {},
	},
	isInfoOpen: {
		open: false,
		info: { title: "", artist: "", year: "", material: "", desc: "" },
	},
	infoActions: {
		setTrue: () => {},
		setFalse: () => {},
	},
	isPaused: true,
	pauseActions: {
		setPaused: () => {},
		setUnpaused: () => {},
	},
});

export function useGallery() {
	const value = useContext(GalleryContext);
	if (value === undefined) {
		throw new Error("useGallery should be used within GalleryProvider");
	}
	return value;
}

export function GalleryProvider({ children }: { children: React.ReactNode }) {
	const [counter, setCounter] = useState(0);
	const [isInfoOpen, setIsInfoOpen] = useState({
		open: false,
		info: { title: "", artist: "", year: "", material: "", desc: "" },
	});
	const [isPaused, setIsPaused] = useState(true);

	const loadingActions = useMemo(
		() => ({
			increase() {
				setCounter((prev) => prev + 1);
			},
			decrease() {
				setCounter((prev) => prev - 1);
			},
		}),
		[],
	);

	const infoActions = useMemo(
		() => ({
			setTrue(info: any) {
				setIsInfoOpen((prev) => ({
					...prev,
					open: true,
					info,
				}));
			},
			setFalse(info: any) {
				setIsInfoOpen((prev) => ({
					...prev,
					open: false,
					info,
				}));
			},
		}),
		[],
	);

	const pauseActions = useMemo(
		() => ({
			setPaused() {
				setIsPaused(true);
			},
			setUnpaused() {
				setIsPaused(false);
			},
		}),
		[],
	);

	const value: GalleryContextType = useMemo(() => {
		return {
			counter,
			loadingActions,
			isInfoOpen,
			infoActions,
			isPaused,
			pauseActions,
		};
	}, [
		counter,
		loadingActions,
		isInfoOpen,
		infoActions,
		isPaused,
		pauseActions,
	]);

	return (
		<GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
	);
}
