import { cache } from "react";
import sharp from "sharp";

const getImageSizeServer = cache(async (imageUrl: string) => {
	const response = await fetch(imageUrl);

	if (!response.ok) {
		throw new Error(`Failed to fetch image: ${response.statusText}`);
	}

	const buffer = await response.arrayBuffer();
	const metadata = await sharp(Buffer.from(buffer)).metadata();

	if (!metadata.width || !metadata.height) {
		throw new Error("Could not retrieve image dimensions");
	}

	return {
		width: metadata.width,
		height: metadata.height,
	};
});

export default getImageSizeServer;
