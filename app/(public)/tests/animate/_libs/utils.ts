/**
 * 이미지 파일을 최적화하고 Base64로 변환하는 함수
 * 사파리 및 인앱 브라우저에서 대용량 이미지 처리 문제를 해결
 */
export async function optimizeAndConvertImage(
	file: File,
	maxWidth = 1920,
	maxHeight = 1920,
	quality = 0.8,
): Promise<string> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		if (!ctx) {
			reject(new Error("Canvas context를 생성할 수 없습니다."));
			return;
		}

		img.onload = () => {
			try {
				// 원본 이미지 크기
				const { width: originalWidth, height: originalHeight } = img;

				// 리사이징 비율 계산
				const ratio = Math.min(
					maxWidth / originalWidth,
					maxHeight / originalHeight,
					1, // 원본보다 크게 만들지 않음
				);

				const newWidth = Math.floor(originalWidth * ratio);
				const newHeight = Math.floor(originalHeight * ratio);

				// Canvas 크기 설정
				canvas.width = newWidth;
				canvas.height = newHeight;

				// 이미지 품질 향상을 위한 설정
				ctx.imageSmoothingEnabled = true;
				ctx.imageSmoothingQuality = "high";

				// 이미지 그리기
				ctx.drawImage(img, 0, 0, newWidth, newHeight);

				// Base64로 변환 (JPEG 포맷으로 압축)
				const compressedBase64 = canvas.toDataURL("image/jpeg", quality);

				// 메모리 정리
				canvas.remove();

				resolve(compressedBase64);
			} catch (error) {
				reject(new Error(`이미지 최적화 실패: ${error}`));
			}
		};

		img.onerror = () => {
			reject(new Error("이미지를 로드할 수 없습니다."));
		};

		// 이미지 로드 시작
		const reader = new FileReader();
		reader.onload = (e) => {
			if (e.target?.result) {
				img.src = e.target.result as string;
			}
		};
		reader.onerror = () => {
			reject(new Error("파일을 읽을 수 없습니다."));
		};
		reader.readAsDataURL(file);
	});
}

/**
 * 이미지 해상도를 검증하는 함수
 */
export async function validateImageDimensions(
	file: File,
	maxWidth = 8000,
	maxHeight = 8000,
): Promise<{ width: number; height: number; isValid: boolean }> {
	return new Promise((resolve) => {
		const img = new Image();

		img.onload = () => {
			const { width, height } = img;
			const isValid = width <= maxWidth && height <= maxHeight;
			resolve({ width, height, isValid });
		};

		img.onerror = (err) => {
			console.log("이미지 로드 실패 ====>", err);
			resolve({ width: 0, height: 0, isValid: false });
		};

		const reader = new FileReader();
		reader.onload = (e) => {
			if (e.target?.result) {
				img.src = e.target.result as string;
			}
		};
		reader.readAsDataURL(file);
	});
}

/**
 * 사파리 전용 이미지 최적화 함수
 * iOS Safari의 메모리 제한을 고려한 더 보수적인 처리
 */
export async function optimizeImageForSafari(file: File): Promise<string> {
	const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

	if (isSafari || isIOS) {
		// Safari/iOS의 경우 더 보수적인 설정
		return optimizeAndConvertImage(file, 1024, 1024, 0.7);
	}

	// 다른 브라우저의 경우 기본 설정
	return optimizeAndConvertImage(file, 1920, 1920, 0.8);
}

/**
 * Base64 문자열의 크기를 바이트 단위로 계산
 */
export function getBase64Size(base64String: string): number {
	// data:image/jpeg;base64, 등의 헤더 제거
	const base64Data = base64String.includes(",")
		? base64String.split(",")[1]
		: base64String;

	// Base64는 3바이트를 4문자로 인코딩하므로
	// 패딩을 고려하여 정확한 크기 계산
	const padding = (base64Data.match(/=/g) || []).length;
	return (base64Data.length * 3) / 4 - padding;
}

const MEDIA_EXT: Record<string, string> = {
	"image/png": "png",
	"image/jpeg": "jpg",
	"image/jpg": "jpg",
	"image/webp": "webp",
	"image/gif": "gif",
};

function fileExtensionFromMime(mime: string): string {
	const base = mime.split(";")[0]?.trim().toLowerCase() ?? "";
	return MEDIA_EXT[base] ?? "png";
}

/** `data:image/png;base64,...` → Blob (다운로드·재업로드용) */
export function dataUrlToBlob(dataUrl: string): Blob {
	const comma = dataUrl.indexOf(",");
	if (comma === -1) {
		throw new Error("유효한 data URL이 아닙니다.");
	}
	const header = dataUrl.slice(0, comma);
	const b64 = dataUrl.slice(comma + 1);
	const mimeMatch = header.match(/^data:([^;,]+)/i);
	const mime = mimeMatch?.[1]?.trim() ?? "application/octet-stream";

	let binary: string;
	try {
		binary = atob(b64);
	} catch {
		throw new Error("Base64 디코딩에 실패했습니다.");
	}

	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return new Blob([bytes], { type: mime });
}

/** Blob을 로컬 파일로 저장 (모바일/데스크톱 공통, ObjectURL 해제 포함) */
export function downloadBlob(blob: Blob, filename: string): void {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.rel = "noopener";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

/**
 * API 등에서 받은 data URL 결과를 파일로 저장합니다.
 * @param baseName 확장자 제외 (예: `animate-20240322`)
 */
export function downloadFromDataUrl(
	dataUrl: string,
	baseName = `animate-${Date.now()}`,
): void {
	const blob = dataUrlToBlob(dataUrl);
	const ext = fileExtensionFromMime(blob.type);
	downloadBlob(blob, `${baseName}.${ext}`);
}

/** 사용자가 올린 원본 File 저장 (이전 MO/PC 분기 대체) */
export function downloadImageFile(file: File): void {
	downloadBlob(file, `animate-${file.name}`);
}
