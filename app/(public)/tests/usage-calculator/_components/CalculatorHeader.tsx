"use client";

import axios from "axios";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/auth/useAuth";
import pricing from "../_data/pricing";
import { type Base, useUsageCalculatorStore } from "../_libs/zustand";

function CalculatorHeader() {
	const { user, loginWithProvider } = useAuth();
	const { mode, model, exchangeRate, base, setExchangeRate, setBase } =
		useUsageCalculatorStore(
			useShallow((state) => ({
				mode: state.mode,
				model: state.model,
				exchangeRate: state.exchangeRate,
				base: state.base,
				setExchangeRate: state.setExchangeRate,
				setBase: state.setBase,
			})),
		);

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
		if (model && mode && exchangeRate.won_number > 0) {
			const newBase: Base = {
				input_txt_base: {
					model: model,
					basePrice: 0,
				},
				input_image_base: {
					model: model,
					basePrice: 0,
				},
				output_txt_base: {
					model: model,
					basePrice: 0,
				},
				output_image_base: {
					model: model,
					basePrice: 0,
				},
			};
			if (mode === "txt-to-txt") {
				newBase.input_txt_base.model = model;
				newBase.input_image_base.model = null;
				newBase.output_txt_base.model = model;
				newBase.output_image_base.model = null;
			} else if (mode === "txt-to-image") {
				newBase.input_txt_base.model = model; // "gpt-image-1"; 최종 모델이 gpt-image-1 이 아님. 그래서 그냥 model로 넣어줌.
				newBase.input_image_base.model = null;
				newBase.output_txt_base.model = null;
				newBase.output_image_base.model = "gpt-image-1";
			} else if (mode === "txt+image-to-txt") {
				newBase.input_txt_base.model = model;
				newBase.input_image_base.model = null; // 역시나 최종 모델이 gpt-image-1 이 아님. 그래서 그냥 null로 넣어줌.
				newBase.output_txt_base.model = model;
				newBase.output_image_base.model = null;
			} else if (mode === "txt+image-to-image") {
				newBase.input_txt_base.model = model;
				newBase.input_image_base.model = "gpt-image-1";
				newBase.output_txt_base.model = null;
				newBase.output_image_base.model = "gpt-image-1";
			}

			const txtInputModelPricing = pricing.txt_model.find(
				(model) => model.model === newBase.input_txt_base.model,
			);
			const imageInputModelPricing = pricing.image_model.find(
				(model) => model.model === newBase.input_image_base.model,
			);
			const txtOutputModelPricing = pricing.txt_model.find(
				(model) => model.model === newBase.output_txt_base.model,
			);
			const imageOutputModelPricing = pricing.image_model.find(
				(model) => model.model === newBase.output_image_base.model,
			);

			const txtInputModelPricingPrice = txtInputModelPricing
				? Number(
						(
							txtInputModelPricing.input_per_token * exchangeRate.won_number
						).toFixed(5),
					)
				: 0;
			const imageInputModelPricingPrice = imageInputModelPricing
				? Number(
						(
							imageInputModelPricing.input_per_token * exchangeRate.won_number
						).toFixed(5),
					)
				: 0;
			const txtOutputModelPricingPrice = txtOutputModelPricing
				? Number(
						(
							txtOutputModelPricing.output_per_token * exchangeRate.won_number
						).toFixed(5),
					)
				: 0;
			const imageOutputModelPricingPrice = imageOutputModelPricing
				? Number(
						(
							imageOutputModelPricing.output_per_token * exchangeRate.won_number
						).toFixed(5),
					)
				: 0;

			newBase.input_txt_base.basePrice = txtInputModelPricingPrice;
			newBase.input_image_base.basePrice = imageInputModelPricingPrice;
			newBase.output_txt_base.basePrice = txtOutputModelPricingPrice;
			newBase.output_image_base.basePrice = imageOutputModelPricingPrice;

			setBase(newBase);
		}
	}, [model, setBase, mode, exchangeRate]);

	return (
		<div className="flex w-full flex-col items-center justify-center gap-1 pt-1">
			<h1 className="font-bold text-lg text-neutral-50 sm:text-2xl">
				API 가격 계산기
			</h1>
			<h2 className="hidden text-gray-400 text-xs sm:block">
				실제 API 호출로 정확한 가격 계산
			</h2>
			<div className="flex flex-col items-center gap-2 sm:flex-row">
				{!user && (
					<Button
						className="w-fit bg-neutral-500 text-neutral-50 hover:bg-neutral-600"
						onClick={() =>
							loginWithProvider("google", "/tests/usage-calculator")
						}
					>
						로그인
					</Button>
				)}
				<div className="flex flex-row items-center gap-2">
					<span className="animate-pulse text-gray-400 text-xs">
						환율: {exchangeRate.won_string}원/달러
					</span>
				</div>
			</div>
			<div className="hidden flex-row items-center gap-2 sm:flex">
				<span className="text-gray-400 text-xs">모드: {mode}</span>
				<Separator orientation="vertical" className="h-4 bg-neutral-400" />
				<span className="text-gray-400 text-xs">인풋:</span>
				{base.input_txt_base.model ? (
					<span className="text-gray-400 text-xs">
						{base.input_txt_base.model}
					</span>
				) : null}
				{base.input_image_base.model ? (
					<span className="text-gray-400 text-xs">
						{base.input_image_base.model}
					</span>
				) : null}
				<Separator orientation="vertical" className="h-4 bg-neutral-400" />
				<span className="text-gray-400 text-xs">아웃풋:</span>
				{base.output_txt_base.model ? (
					<span className="text-gray-400 text-xs">
						{base.output_txt_base.model}
					</span>
				) : null}
				{base.output_image_base.model ? (
					<span className="text-gray-400 text-xs">
						{base.output_image_base.model}
					</span>
				) : null}
			</div>
			<div className="hidden flex-col items-center gap-2 sm:flex">
				<div className="flex flex-row items-center gap-2">
					{base.input_txt_base.basePrice ? (
						<span className="text-gray-400 text-xs">
							인풋: {base.input_txt_base.basePrice}원
						</span>
					) : null}
					{base.input_txt_base.basePrice && base.input_image_base.basePrice ? (
						<Separator orientation="vertical" className="h-4 bg-neutral-400" />
					) : null}
					{base.input_image_base.basePrice ? (
						<span className="text-gray-400 text-xs">
							이미지: {base.input_image_base.basePrice}원
						</span>
					) : null}
				</div>
				<div className="flex flex-row items-center gap-2">
					{base.output_txt_base.basePrice ? (
						<span className="text-gray-400 text-xs">
							아웃풋: {base.output_txt_base.basePrice}원
						</span>
					) : null}
					{base.output_txt_base.basePrice &&
					base.output_image_base.basePrice ? (
						<Separator orientation="vertical" className="h-4 bg-neutral-400" />
					) : null}
					{base.output_image_base.basePrice ? (
						<span className="text-gray-400 text-xs">
							이미지: {base.output_image_base.basePrice}원
						</span>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default CalculatorHeader;
