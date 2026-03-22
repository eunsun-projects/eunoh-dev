"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAnimateMutation } from "../_hooks/hooks";
import { downloadFromDataUrl } from "../_libs/utils";
import CustomLoader from "./animate-loader";

const UploadFile = dynamic(() => import("./upload-file"), {
	ssr: false,
});

function AnimateTemplate() {
	const { mutateAsync: postAnimate, isPending } = useAnimateMutation();
	const [resultDataUrl, setResultDataUrl] = useState<string | null>(null);
	const [progress, setProgress] = useState<number>(0);

	const handleSubmit = async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);
		try {
			const response = await postAnimate({ formData });
			if (
				response.status === "success" &&
				response.imageBase64 &&
				response.mediaType
			) {
				setResultDataUrl(
					`data:${response.mediaType};base64,${response.imageBase64}`,
				);
				toast.success("생성이 완료되었어요.");
			}
		} catch (error) {
			console.error(error);
			toast.error("Animate 생성에 실패했어요. 다시 시도해주세요.");
		}
	};

	const handleDownloadResult = () => {
		if (!resultDataUrl) return;
		try {
			downloadFromDataUrl(resultDataUrl);
			toast.success("다운로드를 시작했어요.");
		} catch {
			toast.error("다운로드에 실패했어요. 다시 시도해주세요.");
		}
	};

	const requestResetToUpload = () => {
		toast.message("지금 보이는 결과 이미지가 초기화돼요.", {
			description: "확인을 누르면 새 사진을 올릴 수 있어요.",
			duration: 12_000,
			action: {
				label: "확인",
				onClick: () => setResultDataUrl(null),
			},
		});
	};

	useEffect(() => {
		if (!isPending) return;
		setProgress(0);
		const stepMs = 45_000 / 100; // 45초 동안 0 → 100%
		const interval = setInterval(() => {
			setProgress((prev) => {
				const next = prev + 1;
				if (next >= 100) {
					clearInterval(interval);
					return 100;
				}
				return next;
			});
		}, stepMs);
		return () => clearInterval(interval);
	}, [isPending]);

	return (
		<div className="relative flex h-full min-h-svh w-full flex-col items-center justify-center sm:w-1/2">
			<h2 className="font-bold text-2xl">Animate</h2>
			{isPending ? (
				<div
					className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background/85 backdrop-blur-sm"
					role="status"
					aria-live="polite"
					aria-busy="true"
				>
					<CustomLoader size={48} color="#004faf" />
					<p className="text-muted-foreground text-sm">
						이미지를 만들고 있어요…
					</p>
					<p>{progress}%</p>
				</div>
			) : null}

			{resultDataUrl ? (
				<div className="flex w-full flex-col items-center">
					<div className="relative mt-[9.8%] mb-6 aspect-[1/1] h-auto w-[61.16%] max-w-md overflow-hidden rounded-[min(5.56vw,40px)] border border-border/60 bg-muted/30 shadow-sm">
						<img
							src={resultDataUrl}
							alt="Animate 생성 결과"
							className="h-full w-full object-contain"
						/>
					</div>
					<div className="flex w-[calc(640px/3)] flex-wrap items-center justify-center gap-3 pb-8">
						<Button
							type="button"
							variant="default"
							className="cursor-pointer flex-col leading-tight"
							onClick={handleDownloadResult}
						>
							저장하기
						</Button>
						<Button
							type="button"
							variant="default"
							className="cursor-pointer flex-col leading-tight"
							onClick={requestResetToUpload}
						>
							다시하기
						</Button>
					</div>
				</div>
			) : (
				<UploadFile onSubmit={handleSubmit} isSubmitting={isPending} />
			)}
		</div>
	);
}

export default AnimateTemplate;
