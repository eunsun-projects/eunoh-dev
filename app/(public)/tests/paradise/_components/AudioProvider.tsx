"use client";

import {
	createContext,
	type PropsWithChildren,
	useContext,
	useState,
} from "react";

const initialState = {
	isPlaying: false,
	setPlaying: (_value: boolean | ((prev: boolean) => boolean)) => {},
};

const AudioContext = createContext(initialState);

export const AudioProvider = ({ children }: PropsWithChildren) => {
	const [isPlaying, setPlaying] = useState(false);

	return (
		<AudioContext.Provider value={{ isPlaying, setPlaying }}>
			{children}
		</AudioContext.Provider>
	);
};

export function useAudio() {
	return useContext(AudioContext);
}
