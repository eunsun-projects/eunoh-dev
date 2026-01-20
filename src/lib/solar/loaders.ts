import { Cache, SRGBColorSpace, type Texture, TextureLoader } from "three";
import { parseSolarSystemData } from "./solarSystemFactory";
import type {
	SolarSystemDataNode,
	TextureResources,
	TexturesConfig,
} from "./types";

Cache.enabled = true;

async function loadJSON<T>(url: string): Promise<T> {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to load ${url}: ${response.status}`);
	}
	return (await response.json()) as T;
}

function loadTexture(loader: TextureLoader, path: string): Promise<Texture> {
	return new Promise((resolve, reject) => {
		loader.load(
			path,
			(texture) => resolve(texture),
			undefined,
			(error) => reject(error),
		);
	});
}

export async function loadTextures(
	url: string,
	onProgress?: (loaded: number, total: number) => void,
): Promise<TextureResources> {
	const config = await loadJSON<TexturesConfig>(url);
	const loader = new TextureLoader();

	const entries: Array<{ name: string; type: string; path: string }> = [];
	for (const [name, textures] of Object.entries(config)) {
		for (const [type, path] of Object.entries(textures)) {
			entries.push({ name, type, path });
		}
	}

	const lensFlarePath = "/solar/textures/lensFlare.png";
	const uniquePaths = new Map<string, string>();

	for (const entry of entries) {
		uniquePaths.set(entry.path, entry.type);
	}
	uniquePaths.set(lensFlarePath, "lensFlare");

	let loadedCount = 0;
	const texturesByPath = new Map<string, Texture>();

	await Promise.all(
		Array.from(uniquePaths.entries()).map(async ([path, type]) => {
			const texture = await loadTexture(loader, path);
			if (
				type === "surface" ||
				type === "atmosphere" ||
				type === "rings" ||
				type === "lensFlare"
			) {
				texture.colorSpace = SRGBColorSpace;
			}
			texturesByPath.set(path, texture);
			loadedCount++;
			if (onProgress) {
				onProgress(loadedCount, uniquePaths.size);
			}
		}),
	);

	const textures: TextureResources["textures"] = {};
	for (const entry of entries) {
		const texture = texturesByPath.get(entry.path);
		if (!texture) {
			continue;
		}
		if (!textures[entry.name]) {
			textures[entry.name] = {};
		}
		textures[entry.name][entry.type] = texture;
	}

	const lensFlare = texturesByPath.get(lensFlarePath);
	if (!lensFlare) {
		throw new Error("Lens flare texture failed to load.");
	}

	return {
		config,
		textures,
		lensFlare,
	};
}

export async function loadObjectsData(url: string, textures: TextureResources) {
	const data = await loadJSON<
		SolarSystemDataNode & { dataValidityRange: [number, number] }
	>(url);
	const [minYear, maxYear] = data.dataValidityRange ?? [0, 0];
	return {
		objects: parseSolarSystemData(data, textures),
		minYear,
		maxYear,
	};
}
