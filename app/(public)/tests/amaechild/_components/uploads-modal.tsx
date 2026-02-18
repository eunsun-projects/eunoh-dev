"use client";

import { Gift, Image, LoaderPinwheel, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { useIffyMutation } from "@/app/(public)/tests/amaechild/_hooks/hooks";
import type { LoadingState } from "@/app/(public)/tests/amaechild/_types/types";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface UploadModalProps {
	loading: LoadingState;
	setLoading: React.Dispatch<React.SetStateAction<LoadingState>>;
}

export default function UploadModal({ loading, setLoading }: UploadModalProps) {
	const router = useRouter();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [isOpen, setIsOpen] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewSrc, setPreviewSrc] = useState<string | null>(null);

	const { mutateAsync: startIffy } = useIffyMutation();

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const handleSubmit = async () => {
		if (!selectedFile) return;
		setLoading({ ...loading, open: true });

		const formData = new FormData();
		formData.append("image", selectedFile);

		try {
			const response = await startIffy({ formData });
			if (response.id && response.status !== "failed") {
				router.push(`/tests/amaechild/result?id=${response.id}`);
			} else {
				setLoading({ ...loading, open: false });
				toast.error("생성에 실패했어요. 다시 시도해주세요.");
			}
		} catch (error) {
			console.error("업로드 실패:", error);
			setLoading({ ...loading, open: false });
			toast.error("업로드 중 오류가 발생했습니다.");
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			if (file.type.startsWith("image/")) {
				const reader = new FileReader();
				reader.onloadend = () => {
					if (typeof reader.result === "string") {
						setPreviewSrc(reader.result);
					} else {
						setPreviewSrc(null);
					}
				};
				reader.onerror = () => {
					console.error("파일 읽기 오류");
					setPreviewSrc(null);
				};
				reader.readAsDataURL(file);
			} else {
				setPreviewSrc(null);
				alert("이미지 파일만 미리보기할 수 있습니다.");
			}
		} else {
			setSelectedFile(null);
			setPreviewSrc(null);
		}

		if (event.target) {
			(event.target as HTMLInputElement).value = "";
		}
	};

	useEffect(() => {
		if (!isOpen) {
			setSelectedFile(null);
			setPreviewSrc(null);
		}
	}, [isOpen]);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="!px-7 box-content flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 py-2 text-lg text-white shadow-lg transition-all duration-300 hover:from-purple-700 hover:to-blue-600 hover:shadow-xl">
					<Gift className="h-5 w-5" />
					<span>참여하기</span>
				</Button>
			</DialogTrigger>
			<DialogContent
				className="bg-gradient-to-b from-purple-100 to-blue-200"
				onInteractOutside={(e) => {
					if (loading.open) {
						e.preventDefault();
					}
				}}
				onEscapeKeyDown={(e) => {
					if (loading.open) {
						e.preventDefault();
					}
				}}
			>
				<DialogHeader className="text-left">
					<DialogTitle className="text-black">이미지 업로드</DialogTitle>
					<DialogDescription>
						업로드한 이미지는 캐릭터 생성을 위해 잠깐 사용되며, 저장되지 않아요.
					</DialogDescription>
					{loading.open && (
						<p className="absolute top-1/2 left-1/2 z-50 w-[280px] -translate-x-1/2 -translate-y-1/2 animate-pulse font-black text-2xl text-black">
							1분 정도 기다려주세요!
						</p>
					)}
				</DialogHeader>

				<div className="relative h-80 rounded-md border border-dashed">
					{loading.open && (
						<div
							style={{
								animation: "scan 3s linear infinite alternate",
							}}
							className="absolute top-full h-1 w-full bg-[#78EFAD] shadow-[0_0_20px_6px_#78EFAD]"
						/>
					)}

					{previewSrc ? (
						<>
							{!loading.open && (
								<Button
									className="absolute top-2 right-2 cursor-pointer bg-transparent p-0.5 shadow-none hover:bg-transparent"
									onClick={() => {
										setPreviewSrc(null);
										setSelectedFile(null);
									}}
								>
									<Trash2 color="red" size={16} />
								</Button>
							)}
							<img
								src={previewSrc}
								alt="선택된 이미지 미리보기"
								className="h-full w-full object-contain"
							/>
						</>
					) : (
						<button
							type="button"
							disabled={loading.open}
							className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1 border-none bg-transparent p-4 text-center text-gray-400 text-xs"
							onClick={handleUploadClick}
						>
							<Image /> 이미지 업로드 <br /> (PNG, JPG, JPEG)
						</button>
					)}
				</div>
				<div className="grid grid-cols-2 gap-3">
					<Button
						onClick={handleUploadClick}
						className="cursor-pointer bg-neutral-800 text-white"
						variant={"outline"}
					>
						업로드
					</Button>
					<input
						type="file"
						ref={fileInputRef}
						onChange={handleFileChange}
						accept="image/*"
						className="hidden"
					/>
					<Button
						className="cursor-pointer"
						disabled={!selectedFile || loading.open}
						onClick={handleSubmit}
					>
						{loading.open ? (
							<LoaderPinwheel className="animate-spin" />
						) : (
							"제출하기"
						)}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
