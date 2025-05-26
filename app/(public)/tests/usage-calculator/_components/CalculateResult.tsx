"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useUsageCalculatorStore } from "../_libs/zustand";

function CalculateResult() {
  const { usage, base } = useUsageCalculatorStore(
    useShallow((state) => ({
      usage: state.usage,
      base: state.base,
    }))
  );

  const prices = useMemo(() => {
    const input = usage?.promptTokens
      ? base.input_txt_base.basePrice * usage.promptTokens
      : 0;
    const output = usage?.completionTokens
      ? base.output_txt_base.basePrice * usage.completionTokens
      : 0;
    const total = input + output;

    return {
      inputPrice: Math.floor(input * 100000) / 100000,
      outputPrice: Math.floor(output * 100000) / 100000,
      totalPrice: Math.floor(total * 100000) / 100000,
    };
  }, [usage, base]);

  return (
    <div className="w-full h-full flex gap-2 items-center justify-center text-neutral-200">
      {usage?.promptTokens ? (
        <p>인풋가격: {prices.inputPrice} 원</p>
      ) : (
        <Skeleton className="w-full h-4" />
      )}
      <Separator orientation="vertical" className="h-4 bg-neutral-200" />
      {usage?.completionTokens ? (
        <p>아웃풋가격: {prices.outputPrice} 원</p>
      ) : (
        <Skeleton className="w-full h-4" />
      )}
      <Separator orientation="vertical" className="h-4 bg-neutral-200" />
      {usage?.promptTokens && usage?.completionTokens ? (
        <p>총 가격: {prices.totalPrice} 원</p>
      ) : (
        <Skeleton className="w-full h-4" />
      )}
    </div>
  );
}

export default CalculateResult;
