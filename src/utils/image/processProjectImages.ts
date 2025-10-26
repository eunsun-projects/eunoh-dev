import type { Project, ProjectWithImages } from "@/types/project.types";
import getImageSizeServer from "./getImageSizeServer";

// 이미지 처리 함수 분리
export async function processProjectImages(
	project: Project,
): Promise<ProjectWithImages> {
	if (!project.images || project.images.length === 0) {
		return {
			...project,
			newImages: [],
		};
	}

	try {
		// 이미지 사이즈 가져오기 (에러 핸들링 포함)
		const sizePromises = project.images.map(async (image) => {
			try {
				return await getImageSizeServer(image);
			} catch (error) {
				console.warn(`Failed to get image size for ${image}:`, error);
				return { width: 0, height: 0 };
			}
		});

		const sizes = await Promise.allSettled(sizePromises);

		const newImages = project.images.map((image, i) => {
			const sizeResult = sizes[i];
			const size =
				sizeResult.status === "fulfilled"
					? sizeResult.value
					: { width: 0, height: 0 };

			return {
				image,
				width: size?.width ?? 0,
				height: size?.height ?? 0,
			};
		});

		return {
			...project,
			newImages,
		};
	} catch (error) {
		console.error("Error processing project images:", error);
		return {
			...project,
			newImages:
				project.images?.map((image) => ({
					image,
					width: 0,
					height: 0,
				})) ?? [],
		};
	}
}
