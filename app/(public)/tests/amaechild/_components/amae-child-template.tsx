"use client";

import { Sparkles, Stars } from "lucide-react";
import { useState } from "react";
import UploadModal from "@/app/(public)/tests/amaechild/_components/uploads-modal";
import { cn } from "@/lib/utils";
import { useAllGiftsQuery } from "../_hooks/hooks";
import type { LoadingState } from "../_types/types";

function AmaeChildTemplate() {
	const [loading, setLoading] = useState<LoadingState>({
		open: false,
		isError: false,
	});

	const { data: allGifts, isLoading: isLoadingAllGifts } = useAllGiftsQuery();

	return (
		<div className="flex h-full min-h-svh flex-col items-center justify-center">
			{/* Floating elements for AI aesthetic */}
			<div className="absolute top-0 left-4 animate-pulse opacity-70">
				<Sparkles className="h-8 w-8 text-purple-400" />
			</div>
			<div className="absolute right-4 bottom-0 animate-pulse opacity-70">
				<Stars className="h-8 w-8 text-purple-400" />
			</div>

			{/* Main content */}
			<div className="space-y-2 text-center">
				<h1 className="pb-3 font-extrabold text-4xl text-purple-900 tracking-tighter md:text-6xl">
					애매한이날
				</h1>
				<h2 className="mt-2 font-bold text-purple-800 text-xl tracking-tight md:text-2xl">
					어린이날 선물 받아도 될까?
				</h2>
				<p className="mt-1 text-purple-600 text-sm opacity-80">
					AI가 당신의 선물 자격을 분석해 드립니다
				</p>
			</div>

			{/* Gift animation container */}
			<div className="relative my-8 h-64 w-64">
				<div className="absolute inset-0 animate-pulse rounded-full bg-purple-200 opacity-20" />
				<div className="animation-delay-700 absolute inset-4 animate-pulse rounded-full bg-purple-300 opacity-10" />
				<div className="relative flex h-full items-center justify-center">
					<img
						src={"/assets/amaechild/img_gift.png"}
						alt="선물 이미지"
						className="w-1/2"
					/>
				</div>
			</div>

			{/* Action button */}
			<UploadModal loading={loading} setLoading={setLoading} />

			{/* AI processing indicator */}
			<div className="mt-4 flex items-center gap-2 text-purple-600 text-xs">
				<div className="mt-0.5 flex space-x-1">
					<div className="h-2 w-2 animate-bounce rounded-full bg-purple-400" />
					<div className="h-2 w-2 animate-bounce rounded-full bg-purple-400 delay-200" />
					<div className="h-2 w-2 animate-bounce rounded-full bg-purple-400 delay-400" />
				</div>
				<span>AI 분석 준비 완료</span>
			</div>
			<div
				className={cn(
					"mt-2 text-purple-600 text-xs",
					isLoadingAllGifts && "animate-pulse",
				)}
			>
				총 {allGifts?.resultCount}명이 참여하였어요
			</div>
		</div>
	);
}

export default AmaeChildTemplate;
