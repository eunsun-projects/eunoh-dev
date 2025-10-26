"use client";

import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsageCalculatorStore } from "../_libs/zustand";

function CalculateResult() {
	const { usage, base } = useUsageCalculatorStore(
		useShallow((state) => ({
			usage: state.usage,
			base: state.base,
		})),
	);

	const prices = useMemo(() => {
		const price = {
			inputPrice: 0,
			outputPrice: 0,
			totalPrice: 0,
		};
		if (!usage) {
			return price;
		}

		if ("input_tokens" in usage) {
			const input = base.input_txt_base.basePrice * usage.input_tokens;
			const output = base.output_txt_base.basePrice * usage.output_tokens;
			const total = input + output;
			return {
				inputPrice: Math.floor(input * 100000) / 100000,
				outputPrice: Math.floor(output * 100000) / 100000,
				totalPrice: Math.floor(total * 100000) / 100000,
			};
		}

		if ("promptTokens" in usage) {
			const input = base.input_txt_base.basePrice * usage.promptTokens;
			const output = base.output_txt_base.basePrice * usage.completionTokens;
			const total = input + output;
			return {
				inputPrice: Math.floor(input * 100000) / 100000,
				outputPrice: Math.floor(output * 100000) / 100000,
				totalPrice: Math.floor(total * 100000) / 100000,
			};
		}

		return price;
	}, [usage, base]);

	return (
		<div className="flex h-fit w-full items-center justify-center gap-2 text-neutral-200">
			{/** vercel ai sdk 안쓴 api 호출시 */}
			{usage ? (
				<p>인풋가격: {prices.inputPrice} 원</p>
			) : (
				<Skeleton className="h-4 w-full" />
			)}
			<Separator orientation="vertical" className="h-4 bg-neutral-200" />
			{usage ? (
				<p>아웃풋가격: {prices.outputPrice} 원</p>
			) : (
				<Skeleton className="h-4 w-full" />
			)}
			<Separator orientation="vertical" className="h-4 bg-neutral-200" />
			{usage ? (
				<p>총 가격: {prices.totalPrice} 원</p>
			) : (
				<Skeleton className="h-4 w-full" />
			)}
		</div>
	);
}

export default CalculateResult;
