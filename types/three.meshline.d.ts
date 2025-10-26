/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "three.meshline" {
	export class MeshLine {
		setPoints(points: number[]): void;
	}
	export class MeshLineMaterial extends THREE.Material {
		constructor(parameters?: any);
	}
}
