"use client";

import heic2any from "heic2any";
import { Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	optimizeImageForSafari,
	validateImageDimensions,
} from "../_libs/utils";
import CustomLoader from "./animate-loader";

interface ApplyUploadFileProps {
	onSubmit: (file: File) => void;
	isSubmitting?: boolean;
	isExisting?: boolean;
}

function UploadFile({
	onSubmit,
	isSubmitting = false,
	isExisting = false,
}: ApplyUploadFileProps) {
	const [isChangingFile, setIsChangingFile] = useState(false);
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const handleDelete = () => {
		setSelectedFile(null);
		setPreviewImage(null);
	};

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		// 파일 크기 제한 (8MB) - 빠른 검증을 위해 먼저 확인
		const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
		if (file.size > MAX_FILE_SIZE) {
			return toast.error("이미지 파일 크기는 8MB 이하여야 합니다.");
		}

		try {
			let processedFile = file;

			// HEIC/HEIF 파일 감지 및 조건부 변환
			const isHeicFile =
				file.type.includes("heic") ||
				file.type.includes("heif") ||
				file.name.toLowerCase().endsWith(".heic") ||
				file.name.toLowerCase().endsWith(".heif");

			if (isHeicFile) {
				setIsChangingFile(true);
				// 브라우저에서 HEIC 지원을 확인
				try {
					// toast.info("HEIC 파일을 변환하고 있습니다...");
					const convertedBlob = await heic2any({
						blob: file,
						toType: "image/jpeg",
						quality: 0.8,
					});

					// Blob을 File 객체로 변환
					processedFile = new File(
						[convertedBlob as Blob],
						file.name.replace(/\.(heic|heif)$/i, ".jpg"),
						{ type: "image/jpeg" },
					);
					setIsChangingFile(false);
					// toast.success("HEIC 파일이 성공적으로 변환되었습니다.");
				} catch (error) {
					console.error("HEIC 변환 실패:", error);
					return toast.error("HEIC 파일 변환에 실패했습니다.");
				}
			}

			// 4단계: 이미지 해상도 검증
			// 이것만 하기로!
			const { width, height, isValid } = await validateImageDimensions(
				processedFile,
				8000,
				8000,
			);

			if (!isValid) {
				if (width === 0 && height === 0) {
					return toast.error("올바르지 않은 이미지 파일입니다.");
				}
				return toast.error(
					`이미지 해상도가 너무 큽니다. (최대 4096x4096)\n현재: ${width}x${height}`,
				);
			}

			setSelectedFile(processedFile);

			// 이미지 최적화 처리 (사파리 전용 최적화 적용)
			const optimizedBase64 = await optimizeImageForSafari(processedFile);

			setPreviewImage(optimizedBase64);

			// 성공 메시지 (선택사항)
			toast.success("이미지가 성공적으로 업로드되었습니다.");
		} catch (error) {
			// console.error("파일 처리 오류:", error);
			setSelectedFile(null);

			const errorMessage =
				error instanceof Error
					? error.message
					: "파일 처리 중 오류가 발생했습니다.";

			toast.error(errorMessage, {
				duration: 5000,
				action: {
					label: "확인",
					onClick: () => {},
				},
				actionButtonStyle: {
					backgroundColor: "#ef4444",
					color: "white",
					fontWeight: "600",
					padding: "8px 16px",
					borderRadius: "6px",
					border: "none",
					cursor: "pointer",
				},
			});
		}

		if (event.target) {
			(event.target as HTMLInputElement).value = "";
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!selectedFile) return;
		onSubmit(selectedFile);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex w-full flex-col items-center justify-center"
		>
			<div className="relative mt-[9.8%] mb-[11.7%] aspect-[1/1] h-auto w-[61.16%] overflow-hidden rounded-[min(5.56vw,40px)] bg-[url(/assets/animate/upload.png)] bg-center bg-contain bg-no-repeat">
				{previewImage && previewImage.length > 0 ? (
					<>
						<Button
							className="absolute top-[min(2.78vw,20px)] right-[min(2.78vw,20px)] h-fit w-fit cursor-pointer bg-transparent p-0.5 shadow-none hover:bg-transparent"
							variant="ghost"
							onClick={handleDelete}
						>
							<Trash2 color="red" size={16} />
						</Button>

						<img
							src={previewImage}
							alt="선택된 이미지 미리보기"
							className="h-full w-full bg-white object-cover"
						/>
					</>
				) : (
					<button
						type="button"
						className="flex h-full min-h-[calc(750px/3)] w-full cursor-pointer flex-col items-center justify-center gap-1 border-none bg-transparent p-4 text-center text-gray-400 text-xs"
						onClick={handleUploadClick}
					>
						{isChangingFile && (
							<div className="flex flex-col items-center justify-center">
								<CustomLoader size={24} color="#004faf" />
							</div>
						)}
					</button>
				)}
			</div>
			<div className="flex w-[calc(640px/3)] items-center justify-center">
				<input
					type="file"
					ref={fileInputRef}
					onChange={handleFileChange}
					// accept="image/*"
					// gif 제외!!
					accept="image/jpeg, image/png, image/webp, image/bmp, image/heic, image/heif"
					className="hidden"
				/>
				<Button
					className="cursor-pointer flex-col leading-tight"
					type="submit"
					disabled={
						!selectedFile || isSubmitting || isExisting || isChangingFile
					}
				>
					<span>Submit</span>
				</Button>
			</div>
		</form>
	);
}

export default UploadFile;
