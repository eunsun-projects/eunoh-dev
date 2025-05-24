import { create } from "zustand";

export const MODES = {
  TXT_TO_TXT: "txt-to-txt",
  TXT_TO_IMAGE: "txt-to-image",
  TXT_IMAGE_TO_TXT: "txt+image-to-txt",
  TXT_IMAGE_TO_IMAGE: "txt+image-to-image",
} as const;

export type Mode = (typeof MODES)[keyof typeof MODES];

export interface UsageCalculatorState {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export const useUsageCalculatorStore = create<UsageCalculatorState>((set) => ({
  mode: "txt-to-txt",
  setMode: (mode: Mode) => set({ mode }),
}));
