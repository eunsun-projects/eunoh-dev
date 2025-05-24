import { create } from "zustand";

export const MODES = {
  TXT_TO_TXT: "txt-to-txt",
  TXT_TO_IMAGE: "txt-to-image",
  TXT_IMAGE_TO_TXT: "txt+image-to-txt",
  TXT_IMAGE_TO_IMAGE: "txt+image-to-image",
} as const;

export const MODELS_WITHOUT_IMAGE = {
  GPT_4O_MINI: "gpt-4o-mini",
  GPT_4O: "gpt-4o",
} as const;

export const MODELS_WITH_IMAGE = {
  GPT_IMAGE_1: "gpt-image-1",
} as const;

export type Mode = (typeof MODES)[keyof typeof MODES];
export type ModelWithoutImage =
  (typeof MODELS_WITHOUT_IMAGE)[keyof typeof MODELS_WITHOUT_IMAGE];
export type ModelWithImage =
  (typeof MODELS_WITH_IMAGE)[keyof typeof MODELS_WITH_IMAGE];
export type Model = ModelWithoutImage | ModelWithImage;

export interface UsageCalculatorState {
  mode: Mode;
  setMode: (mode: Mode) => void;
  model: ModelWithoutImage;
  setModel: (model: ModelWithoutImage) => void;
}

export const useUsageCalculatorStore = create<UsageCalculatorState>((set) => ({
  mode: "txt-to-txt",
  setMode: (mode: Mode) => set({ mode }),
  model: "gpt-4o-mini",
  setModel: (model: ModelWithoutImage) => set({ model }),
}));
