import { create } from 'zustand';

export interface TimeCapsuleState {
  isClicked: boolean;
  setIsClicked: (isClicked: boolean) => void;
}

export const useTimeCapsuleStore = create<TimeCapsuleState>((set) => ({
  isClicked: false,
  setIsClicked: (isClicked) => set({ isClicked }),
}));
