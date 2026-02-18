import type { SupabaseClient } from "@supabase/supabase-js";
import sharp from "sharp";
import type { Database } from "@/types/supabase";

export async function convertToPngBuffer(
	imageFile: File,
): Promise<{ imageBuffer: Buffer; pngBuffer: Buffer }> {
	const imageBytes = await imageFile.arrayBuffer();
	const imageBuffer = Buffer.from(imageBytes);

	const pngBuffer =
		imageFile.type !== "image/png"
			? await sharp(imageBuffer).png({ quality: 60 }).toBuffer()
			: imageBuffer;

	return { imageBuffer, pngBuffer };
}

export async function uploadOriginalImage(
	supabase: SupabaseClient<Database>,
	buffer: Buffer,
): Promise<string> {
	const filePath = `iffy-original/${Date.now()}-${crypto.randomUUID()}.png`;

	const { error } = await supabase.storage
		.from("images")
		.upload(filePath, buffer, {
			contentType: "image/png",
			upsert: true,
		});

	if (error) {
		console.error("[iffy] Supabase original upload error:", error);
		throw new Error(`원본 이미지 업로드에 실패했습니다: ${error.message}`);
	}

	return getPublicUrl(supabase, filePath);
}

export async function uploadStylizedImage(
	supabase: SupabaseClient<Database>,
	base64Image: string,
): Promise<string> {
	const pngBuffer = Buffer.from(base64Image, "base64");
	const webpBuffer = await sharp(pngBuffer).webp({ quality: 80 }).toBuffer();
	const filePath = `iffy/${Date.now()}-${crypto.randomUUID()}.webp`;

	const { error } = await supabase.storage
		.from("images")
		.upload(filePath, webpBuffer, {
			contentType: "image/webp",
			upsert: true,
		});

	if (error) {
		console.error("[iffy] Supabase stylized upload error:", error);
		throw new Error(`스타일 이미지 업로드에 실패했습니다: ${error.message}`);
	}

	return getPublicUrl(supabase, filePath);
}

function getPublicUrl(
	supabase: SupabaseClient<Database>,
	filePath: string,
): string {
	const { data } = supabase.storage.from("images").getPublicUrl(filePath);

	if (!data?.publicUrl) {
		throw new Error("업로드된 이미지의 공개 URL을 가져올 수 없습니다.");
	}

	return data.publicUrl;
}
