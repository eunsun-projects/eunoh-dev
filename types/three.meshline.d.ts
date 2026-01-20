declare module "three.meshline" {
	import type {
		BufferGeometry,
		ColorRepresentation,
		ShaderMaterial,
		Side,
		Texture,
		Vector2,
		Vector3,
	} from "three";

	export type MeshLineWidthCallback = (p: number) => number;

	export class MeshLine {
		geometry: BufferGeometry;
		setGeometry(
			geometry: BufferGeometry | Vector3[] | Float32Array | number[],
			widthCallback?: MeshLineWidthCallback,
		): void;
		setPoints(
			points: Vector3[] | Float32Array | number[],
			widthCallback?: MeshLineWidthCallback,
		): void;
		advance(position: Vector3): void;
	}

	export interface MeshLineMaterialParameters {
		lineWidth?: number;
		linewidth?: number;
		color?: ColorRepresentation;
		transparent?: boolean;
		opacity?: number;
		sizeAttenuation?: boolean;
		depthTest?: boolean;
		depthWrite?: boolean;
		near?: number;
		far?: number;
		resolution?: Vector2;
		side?: Side;
		map?: Texture;
	}

	export class MeshLineMaterial extends ShaderMaterial {
		constructor(parameters?: MeshLineMaterialParameters);
		resolution: Vector2;
	}
}
