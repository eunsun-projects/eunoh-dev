import type { LanguageModelUsage } from "ai";
import { create } from "zustand";

export const MODES = {
  TXT_TO_TXT: "txt-to-txt",
  TXT_TO_IMAGE: "txt-to-image",
  TXT_IMAGE_TO_TXT: "txt+image-to-txt",
  TXT_IMAGE_TO_IMAGE: "txt+image-to-image",
} as const;

export const MODELS = {
  GPT_4O_MINI: "gpt-4o-mini",
  GPT_4O: "gpt-4o",
  GPT_IMAGE_1: "gpt-image-1",
} as const;

export type Mode = (typeof MODES)[keyof typeof MODES];
export type Model = (typeof MODELS)[keyof typeof MODELS];
export type ExchangeRate = {
  won_number: number;
  won_string: string;
};
export type ModelAndBasePrice = {
  model: Model | null;
  basePrice: number | 0;
};
export type Base = {
  input_txt_base: ModelAndBasePrice;
  input_image_base: ModelAndBasePrice;
  output_txt_base: ModelAndBasePrice;
  output_image_base: ModelAndBasePrice;
};

export interface UsageCalculatorState {
  mode: Mode;
  setMode: (mode: Mode) => void;
  model: Model;
  setModel: (model: Model) => void;
  usage: LanguageModelUsage | null;
  setUsage: (usage: LanguageModelUsage | null) => void;
  exchangeRate: ExchangeRate;
  setExchangeRate: (exchangeRate: ExchangeRate) => void;
  base: Base;
  setBase: (base: Base) => void;
}

export const useUsageCalculatorStore = create<UsageCalculatorState>((set) => ({
  mode: "txt-to-txt",
  setMode: (mode: Mode) => set({ mode }),
  model: "gpt-4o-mini",
  setModel: (model: Model) => set({ model }),
  usage: null,
  setUsage: (usage: LanguageModelUsage | null) => set({ usage }),
  exchangeRate: {
    won_number: 0,
    won_string: "",
  },
  setExchangeRate: (exchangeRate: ExchangeRate) => set({ exchangeRate }),
  base: {
    input_txt_base: {
      model: "gpt-4o-mini",
      basePrice: 0,
    },
    input_image_base: {
      model: null,
      basePrice: 0,
    },
    output_txt_base: {
      model: "gpt-4o-mini",
      basePrice: 0,
    },
    output_image_base: {
      model: null,
      basePrice: 0,
    },
  },
  setBase: (base: Base) => set({ base }),
}));
