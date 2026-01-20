import type { Mesh, Texture } from "three";
import type { MeshLine } from "three.meshline";
import type { AsteroidBelt } from "./objects/AsteroidBelt";
import type { SolarSysObj } from "./objects/SolarSysObj";

export type OrbitElements = Record<string, number>;

export interface OrbitData {
	base: OrbitElements;
	cy?: OrbitElements;
	day?: OrbitElements;
	epoch?: number;
	afterEpoch?: boolean;
	segments?: number;
	meshLine?: MeshLine;
	line?: Mesh;
	lastSegmentTime?: Date;
	lastDrawTime?: Date;
}

export interface SolarSystemDataNode {
	name: string;
	baseColor?: string | number;
	radius?: number;
	tilt?: number;
	rotationPeriod?: number | null;
	orbit?: OrbitData;
	syncMap?: boolean;
	ellipsoidParams?: {
		height: number;
		depth: number;
	};
	model?: string;
	modelOffset?: [number, number, number];
	geometryScale?: [number, number, number];
	innerRadius?: number;
	outerRadius?: number;
	orbitingObjects?: SolarSystemDataNode[];
	[key: string]: unknown;
}

export interface TexturesConfig {
	[name: string]: {
		[type: string]: string;
	};
}

export type TextureSet = Partial<Record<string, Texture>>;

export interface TextureResources {
	config: TexturesConfig;
	textures: Record<string, TextureSet>;
	lensFlare: Texture;
}

export type SolarSystemMap = Record<string, SolarSysObj | AsteroidBelt>;
