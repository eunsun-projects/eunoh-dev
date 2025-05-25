"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/auth/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import pricing from "../_data/pricing";
import {
  MODELS_WITHOUT_IMAGE,
  MODELS_WITH_IMAGE,
  MODES,
  useUsageCalculatorStore,
} from "../_libs/zustand";

function CalculatorHeader() {
  const { loginWithProvider } = useAuth();
  const {
    mode,
    inputModel,
    exchangeRate,
    setExchangeRate,
    setBasePricingNumber,
  } = useUsageCalculatorStore(
    useShallow((state) => ({
      mode: state.mode,
      inputModel: state.inputModel,
      exchangeRate: state.exchangeRate,
      setExchangeRate: state.setExchangeRate,
      setBasePricingNumber: state.setBasePricingNumber,
    }))
  );
  const [selectedModels, setSelectedModels] = useState<{
    inputModel: string;
    outputModel: string;
  }>({
    inputModel: MODELS_WITHOUT_IMAGE.GPT_4O_MINI,
    outputModel: MODELS_WITHOUT_IMAGE.GPT_4O_MINI,
  });

  const [basePricing, setBasePricing] = useState<{
    input_base: string | "";
    output_base: string | "";
  }>({
    input_base: "",
    output_base: "",
  });

  useEffect(() => {
    const url =
      "https://m.search.naver.com/p/csearch/content/qapirender.nhn?key=calculator&pkid=141&q=%ED%99%98%EC%9C%A8&where=m&u1=keb&u6=standardUnit&u7=0&u3=USD&u4=KRW&u8=down&u2=1";

    const axiosInstance = axios.create({
      baseURL: "https://m.search.naver.com",
    });

    axiosInstance.get(url).then((res) => {
      const wonRateObj = res.data.country[1];
      setExchangeRate({
        won_number: Number(wonRateObj.value.replace(/,/g, "")),
        won_string: wonRateObj.value,
      });
    });
  }, [setExchangeRate]);

  useEffect(() => {
    if (mode === MODES.TXT_TO_TXT) {
      setSelectedModels({
        inputModel: inputModel,
        outputModel: inputModel,
      });
    } else if (mode === MODES.TXT_TO_IMAGE) {
      setSelectedModels({
        inputModel: inputModel,
        outputModel: MODELS_WITH_IMAGE.GPT_IMAGE_1,
      });
    } else if (mode === MODES.TXT_IMAGE_TO_TXT) {
      setSelectedModels({
        inputModel: `${inputModel} + ${MODELS_WITH_IMAGE.GPT_IMAGE_1}`,
        outputModel: inputModel,
      });
    } else if (mode === MODES.TXT_IMAGE_TO_IMAGE) {
      setSelectedModels({
        inputModel: `${inputModel} + ${MODELS_WITH_IMAGE.GPT_IMAGE_1}`,
        outputModel: MODELS_WITH_IMAGE.GPT_IMAGE_1,
      });
    }
  }, [inputModel, mode]);

  useEffect(() => {
    const isOutputModelImage =
      mode === MODES.TXT_TO_IMAGE || mode === MODES.TXT_IMAGE_TO_IMAGE;

    const outputModelsPricingBase = isOutputModelImage
      ? pricing.image_model
      : pricing.txt_model;

    const outputModelName = isOutputModelImage
      ? `${selectedModels.outputModel}-images`
      : selectedModels.outputModel;

    const isInputModelDouble = selectedModels.inputModel.includes("+");

    const inputBaseModelSingle = isInputModelDouble
      ? null
      : pricing.txt_model.find(
          (model) => model.model === selectedModels.inputModel
        );

    const inputBasePrice = inputBaseModelSingle
      ? Number(
          (
            inputBaseModelSingle.input_per_token * exchangeRate.won_number
          ).toFixed(5)
        )
      : 0;

    let inputBasePricingNumber = {
      input_txt_base: inputBasePrice,
      input_image_base: 0,
      output_base: 0,
    };

    let inputBasePricingString =
      inputBasePrice > 0 ? `${String(inputBasePrice)} 원` : "";

    if (isInputModelDouble) {
      const inputModelNames = selectedModels.inputModel
        .split("+")
        .map((name) => name.trim());

      const firstInputModel = pricing.txt_model.find(
        (model) => model.model === inputModelNames[0]
      )!;

      const secondInputModel = pricing.image_model.find(
        (model) => model.model === `${inputModelNames[1]}-vision`
      )!;

      const firstInputModelPrice = Number(
        (firstInputModel.input_per_token * exchangeRate.won_number).toFixed(5)
      );
      const secondInputModelPrice = Number(
        (secondInputModel.input_per_token * exchangeRate.won_number).toFixed(5)
      );

      inputBasePricingString = `${String(firstInputModelPrice)} 원 + ${String(
        secondInputModelPrice
      )} 원`;

      inputBasePricingNumber = {
        input_txt_base: firstInputModelPrice,
        input_image_base: secondInputModelPrice,
        output_base: 0,
      };
    }

    const outputBaseModel = outputModelsPricingBase.find(
      (model) => model.model === outputModelName
    );

    if (exchangeRate.won_number > 0 && outputBaseModel) {
      const outputBasePrice = Number(
        (outputBaseModel.output_per_token * exchangeRate.won_number).toFixed(5)
      );

      inputBasePricingNumber = {
        ...inputBasePricingNumber,
        output_base: outputBasePrice,
      };

      setBasePricing({
        input_base: inputBasePricingString,
        output_base: `${String(outputBasePrice)} 원`,
      });

      setBasePricingNumber(inputBasePricingNumber);
    }
  }, [exchangeRate, selectedModels, mode, setBasePricingNumber]);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h1 className="text-2xl font-bold text-neutral-50">
        써보고 알려준다!! API 가격 계산기!!
      </h1>
      <h2 className="text-sm text-gray-400">
        API별(모드), 모델별 실제 사용량을 계산 해준다. 모의 계산 아님. 진짜 API
        호출함. 돈은 내가 냄.
      </h2>
      <div className="flex flex-row gap-4">
        <Button
          className="w-fit bg-neutral-500 text-neutral-50 hover:bg-neutral-600"
          onClick={() => loginWithProvider("google", "/tests/usage-calculator")}
        >
          로그인해야될걸?
        </Button>
        <div className="flex flex-row gap-2 items-center">
          <span className="text-sm text-gray-400 animate-pulse">
            오늘의 환율: {exchangeRate.won_string} 원/달러
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <span className="text-sm text-gray-400">모드: {mode}</span>
        <Separator orientation="vertical" className="h-4 bg-neutral-400" />
        <span className="text-sm text-gray-400">
          인풋모델: {selectedModels.inputModel}
        </span>
        <Separator orientation="vertical" className="h-4 bg-neutral-400" />
        <span className="text-sm text-gray-400">
          아웃풋모델: {selectedModels.outputModel}
        </span>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <span className="text-sm text-gray-400">
          인풋가격기준: {basePricing.input_base}
        </span>
        <Separator orientation="vertical" className="h-4 bg-neutral-400" />
        <span className="text-sm text-gray-400">
          아웃풋가격기준: {basePricing.output_base}
        </span>
        <Separator orientation="vertical" className="h-4 bg-neutral-400" />
        <span className="text-sm text-gray-400">토큰당 가격임</span>
      </div>
    </div>
  );
}

export default CalculatorHeader;
