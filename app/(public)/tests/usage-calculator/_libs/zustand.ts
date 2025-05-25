import type { LanguageModelUsage } from "ai";
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
export type ExchangeRate = {
  won_number: number;
  won_string: string;
};
export type BasePricingNumber = {
  input_txt_base: number;
  input_image_base: number;
  output_base: number;
};

export interface UsageCalculatorState {
  mode: Mode;
  setMode: (mode: Mode) => void;
  inputModel: ModelWithoutImage;
  setInputModel: (model: ModelWithoutImage) => void;
  usage: LanguageModelUsage | null;
  setUsage: (usage: LanguageModelUsage | null) => void;
  exchangeRate: ExchangeRate;
  setExchangeRate: (exchangeRate: ExchangeRate) => void;
  basePricingNumber: BasePricingNumber;
  setBasePricingNumber: (basePricing: BasePricingNumber) => void;
}

export const useUsageCalculatorStore = create<UsageCalculatorState>((set) => ({
  mode: "txt-to-txt",
  setMode: (mode: Mode) => set({ mode }),
  inputModel: "gpt-4o-mini",
  setInputModel: (model: ModelWithoutImage) => set({ inputModel: model }),
  usage: null,
  setUsage: (usage: LanguageModelUsage | null) => set({ usage }),
  exchangeRate: {
    won_number: 0,
    won_string: "",
  },
  setExchangeRate: (exchangeRate: ExchangeRate) => set({ exchangeRate }),
  basePricingNumber: {
    input_txt_base: 0,
    input_image_base: 0,
    output_base: 0,
  },
  setBasePricingNumber: (basePricing: BasePricingNumber) =>
    set({ basePricingNumber: basePricing }),
}));
