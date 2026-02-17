import { create } from "zustand";
import type { Iffy } from "../_types/types";

interface IffyStore {
	iffy: Iffy | null;
	setIffy: (iffy: Iffy) => void;
	refetchCount: number;
	setRefetchCount: (refetchCount: number) => void;
	Kakao: any | null;
	setKakao: (kakao: any) => void;
}

const useIffyStore = create<IffyStore>((set) => ({
	iffy: null,
	setIffy: (iffy) => set({ iffy }),
	Kakao: null,
	setKakao: (kakao) => set({ Kakao: kakao }),
	refetchCount: 0,
	setRefetchCount: (refetchCount) => set({ refetchCount }),
}));

export default useIffyStore;
