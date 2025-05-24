"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/auth/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import pricing from "../_data/pricing";
import {
  MODELS_WITHOUT_IMAGE,
  MODELS_WITH_IMAGE,
  MODES,
  useUsageCalculatorStore,
} from "../_libs/zustand";

function CalculatorHeader() {
  const { loginWithProvider } = useAuth();
  const { mode, model } = useUsageCalculatorStore();
  const [selectedModels, setSelectedModels] = useState<{
    inputModel: string;
    outputModel: string;
  }>({
    inputModel: MODELS_WITHOUT_IMAGE.GPT_4O_MINI,
    outputModel: MODELS_WITHOUT_IMAGE.GPT_4O_MINI,
  });

  const [exchangeRate, setExchangeRate] = useState<{
    won_number: number;
    won_string: string;
  }>({
    won_number: 0,
    won_string: "",
  });

  const [basePricing, setBasePricing] = useState<{
    input_base: string | "";
    output_base: string | "";
  }>({
    input_base: "",
    output_base: "",
  });

  console.log(basePricing);

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
  }, []);

  useEffect(() => {
    if (mode === MODES.TXT_TO_TXT) {
      setSelectedModels({
        inputModel: model,
        outputModel: model,
      });
    } else if (mode === MODES.TXT_TO_IMAGE) {
      setSelectedModels({
        inputModel: model,
        outputModel: MODELS_WITH_IMAGE.GPT_IMAGE_1,
      });
    } else if (mode === MODES.TXT_IMAGE_TO_TXT) {
      setSelectedModels({
        inputModel: `${model} + ${MODELS_WITH_IMAGE.GPT_IMAGE_1}`,
        outputModel: model,
      });
    } else if (mode === MODES.TXT_IMAGE_TO_IMAGE) {
      setSelectedModels({
        inputModel: `${model} + ${MODELS_WITH_IMAGE.GPT_IMAGE_1}`,
        outputModel: MODELS_WITH_IMAGE.GPT_IMAGE_1,
      });
    }
  }, [model, mode]);

  useEffect(() => {
    console.log("selectedModels ===>", selectedModels);
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

    let inputBasePricingString = inputBaseModelSingle
      ? `${String(
          (
            inputBaseModelSingle.input_per_token * exchangeRate.won_number
          ).toFixed(5)
        )} 원`
      : "";

    if (isInputModelDouble) {
      const inputModelNames = selectedModels.inputModel
        .split("+")
        .map((name) => name.trim());

      console.log(inputModelNames);

      const firstInputModel = pricing.txt_model.find(
        (model) => model.model === inputModelNames[0]
      )!;

      const secondInputModel = pricing.image_model.find(
        (model) => model.model === `${inputModelNames[1]}-vision`
      )!;

      inputBasePricingString = `${String(
        (firstInputModel.input_per_token * exchangeRate.won_number).toFixed(5)
      )} 원 + ${String(
        (secondInputModel.input_per_token * exchangeRate.won_number).toFixed(5)
      )} 원`;
    }

    const outputBaseModel = outputModelsPricingBase.find(
      (model) => model.model === outputModelName
    );

    if (exchangeRate.won_number > 0 && outputBaseModel) {
      setBasePricing({
        input_base: inputBasePricingString,
        output_base: `${String(
          (outputBaseModel.output_per_token * exchangeRate.won_number).toFixed(
            5
          )
        )} 원`,
      });
    }
  }, [exchangeRate, selectedModels, mode]);

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
