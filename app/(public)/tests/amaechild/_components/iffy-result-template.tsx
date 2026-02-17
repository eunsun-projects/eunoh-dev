"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useIffyQuery } from "../_hooks/hooks";
import SparkleStars from "./sparkle-stars";

interface EachResultTemplateProps {
	id: string;
}

function IffyResultTemplate({ id }: EachResultTemplateProps) {
	const router = useRouter();
	const { data: iffy, isLoading } = useIffyQuery({ id });

	const handleGoToLink = () => {
		if (iffy?.link) {
			window.open(iffy.link, "_blank");
		} else {
			alert("링크가 없습니다.");
		}
	};

	useEffect(() => {
		if (iffy?.is_error) {
			toast.error(iffy?.commentary);
			router.push("/tests/amaechild");
		}
	}, [iffy, router]);

	if (isLoading || !iffy) {
		return (
			<div className="flex h-screen items-center justify-center">
				<SparkleStars className="absolute top-0 left-0" />
			</div>
		);
	}

	// 이미지가 없는 경우 처리 필요
	if (!iffy.gift_image_url) {
		return (
			<div className="flex h-screen items-center justify-center">
				<SparkleStars className="absolute top-0 left-0" />
			</div>
		);
	}

	return (
		<div className="h-auto">
			<div className="flex flex-col gap-5">
				<div className="flex flex-row items-center justify-center gap-1 space-y-2">
					<SparkleStars />
					<h2 className="flex items-center gap-2 font-bold text-2xl text-purple-800 tracking-tight">
						선물을 사달라는 요청이 왔어요!
					</h2>
				</div>

				<div className="flex flex-col items-center justify-center gap-3">
					<div className="relative h-[80svw] max-h-[500px] w-[80svw] max-w-[500px] rounded-md">
						<Skeleton className="absolute top-0 left-0 h-full w-full" />
						<Image
							src={iffy.gift_image_url}
							alt="선물 이미지"
							className="object-cover"
							fill
						/>
					</div>
					{iffy.is_person && (
						<p className="w-full rounded-md bg-white/50 py-2 text-center font-semibold text-blue-500 text-lg">
							{iffy.age}세로 추정돼요!
						</p>
					)}
					<div className="w-full space-y-3 rounded-md bg-white/50 p-5 px-4">
						<div className="flex w-full items-center justify-center text-center font-bold text-purple-800 text-xl tracking-tight md:text-2xl">
							{iffy.is_error ? (
								<div>{iffy.gift_name}</div>
							) : (
								<div>
									<span>
										{iffy.brand} {iffy.gift_name}
									</span>
									<br />
									선물해보는 건 어떨까요?
								</div>
							)}
						</div>
						<p className="font-semibold text-base text-purple-950">
							{iffy.commentary}
						</p>
					</div>
				</div>

				<div className="flex flex-col items-center justify-center gap-3">
					{!iffy.is_error && (
						<Button
							className="flex h-12 w-full cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 font-bold text-lg text-white shadow-lg transition-all duration-1000 hover:from-purple-700 hover:to-blue-600 hover:shadow-xl"
							onClick={handleGoToLink}
						>
							사주러가기
						</Button>
					)}

					<div className="flex w-full gap-2 text-center">
						<Button
							className="flex-1 cursor-pointer gap-2 rounded-full bg-purple-500 text-sm text-white shadow-lg transition-all duration-300 hover:bg-purple-600 hover:shadow-xl"
							onClick={() => router.push("/amaechild")}
						>
							나도해보기
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default IffyResultTemplate;
