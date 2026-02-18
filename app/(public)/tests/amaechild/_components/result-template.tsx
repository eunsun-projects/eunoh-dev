"use client";

import { LoaderPinwheel } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import useKakao, { useIffyQuery } from "../_hooks/hooks";
import type { Iffy } from "../_types/types";
import SparkleStars from "./sparkle-stars";

function Result() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { handleShareToKakao } = useKakao();
	const [imageLoaded, setImageLoaded] = useState(false);
	const prevImageUrlRef = useRef<string | null>(null);

	const id = searchParams.get("id");

	useEffect(() => {
		if (!id) {
			router.push("/");
		}
	}, [id, router]);

	const {
		data: iffyFinal,
		isLoading,
		isError,
		error,
	} = useIffyQuery({ id: id as string });

	const isProcessing = iffyFinal?.status === "processing";
	const isCompleted = iffyFinal?.status === "completed";

	useEffect(() => {
		if (!isLoading && (!id || !iffyFinal)) {
			toast.error("결과를 불러올 수 없습니다. 다시 시도해주세요.");
			router.push("/tests/amaechild");
		}
	}, [id, iffyFinal, isLoading, router]);

	useEffect(() => {
		if (isError) {
			const errorMessage =
				(error as Error)?.message || "결과를 불러오는 중 오류가 발생했습니다.";
			toast.error(errorMessage);
			router.push("/tests/amaechild");
		} else if (iffyFinal?.is_error) {
			toast.error(iffyFinal?.commentary || "처리 중 오류가 발생했습니다.");
			router.push("/tests/amaechild");
		}
	}, [isError, error, iffyFinal, router]);

	const currentImageUrl = iffyFinal?.gift_image_url ?? null;
	if (prevImageUrlRef.current !== currentImageUrl) {
		prevImageUrlRef.current = currentImageUrl;
		if (imageLoaded) setImageLoaded(false);
	}

	if (isLoading || !id) {
		return (
			<div className="flex h-screen items-center justify-center">
				<SparkleStars className="absolute top-0 left-0" />
				<p className="z-10 text-white">결과를 불러오는 중...</p>
			</div>
		);
	}

	if (!iffyFinal) {
		return (
			<div className="flex h-screen items-center justify-center">
				<SparkleStars className="absolute top-0 left-0" />
				<p className="z-10 text-white">결과 데이터 확인 중...</p>
			</div>
		);
	}

	return (
		<div className="h-auto p-1">
			<div className="flex flex-col gap-5">
				<div className="flex flex-col items-center justify-center gap-2 space-y-2 p-1 sm:flex-row">
					<SparkleStars />
					<div className="flex flex-col items-center justify-center">
						<h2 className="flex w-full items-center gap-2 whitespace-pre-wrap break-words break-keep text-center font-bold text-purple-800 text-xl tracking-tight sm:w-1/2">
							{iffyFinal.humor}
						</h2>
					</div>
				</div>

				<div className="flex flex-col items-center justify-center gap-3">
					<div className="relative h-[80svw] max-h-[500px] w-[80svw] max-w-[500px] overflow-hidden rounded-md bg-gray-200">
						{isProcessing && (
							<div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
								<LoaderPinwheel className="h-10 w-10 animate-spin text-purple-500" />
								<p className="animate-pulse font-semibold text-purple-700 text-sm">
									캐릭터 이미지 생성 중...
								</p>
							</div>
						)}
						{isCompleted && iffyFinal.gift_image_url && (
							<>
								{!imageLoaded && (
									<div className="absolute inset-0 flex animate-pulse items-center justify-center text-gray-500">
										이미지 로딩 중...
									</div>
								)}
								<img
									key={iffyFinal.gift_image_url}
									src={iffyFinal.gift_image_url}
									alt="선물 이미지"
									className="absolute inset-0 h-full w-full object-cover"
									onLoad={() => setImageLoaded(true)}
									onError={() => setImageLoaded(false)}
								/>
							</>
						)}
					</div>

					{iffyFinal.is_person && (
						<p className="w-full rounded-md bg-white/50 py-2 text-center font-semibold text-blue-500 text-lg sm:w-1/2">
							{iffyFinal.age}세로 추정돼요!
						</p>
					)}

					<div className="w-full space-y-3 rounded-md bg-white/50 p-5 px-4 sm:w-1/2">
						<div className="flex w-full items-center font-bold text-purple-800 text-xl tracking-tight md:text-2xl">
							<div className="whitespace-pre-wrap break-words break-keep text-center">
								<span>
									{iffyFinal.brand} {iffyFinal.gift_name}
								</span>
								을 선물해 드릴게요.
							</div>
						</div>
						<p className="font-semibold text-base text-purple-950">
							{iffyFinal.commentary}
						</p>
					</div>
					<div className="flex w-full flex-col items-center justify-center gap-3 sm:w-1/2">
						{!iffyFinal.is_error && isCompleted && (
							<Button
								className="flex h-12 w-full cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 font-bold text-lg text-white shadow-lg transition-all duration-1000 hover:from-purple-700 hover:to-blue-600 hover:shadow-xl"
								onClick={() =>
									handleShareToKakao({ iffyData: iffyFinal as Iffy })
								}
							>
								공유하기
								<RiKakaoTalkFill height={24} width={24} className="size-6" />
							</Button>
						)}

						<div className="flex w-full gap-2 text-center">
							{iffyFinal.link && (
								<Link
									target="_blank"
									className="flex flex-1 items-center justify-center rounded-full bg-purple-500 text-sm text-white shadow-lg transition-all duration-300 hover:bg-purple-600 hover:shadow-xl"
									href={iffyFinal.link}
								>
									직접 사러가기
								</Link>
							)}
							<Button
								className="flex-1 cursor-pointer gap-2 rounded-full bg-purple-500 text-sm text-white shadow-lg transition-all duration-300 hover:bg-purple-600 hover:shadow-xl"
								onClick={() => router.push("/tests/amaechild")}
							>
								다시하기
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function ResultTemplate() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Result />
		</Suspense>
	);
}

export default ResultTemplate;
