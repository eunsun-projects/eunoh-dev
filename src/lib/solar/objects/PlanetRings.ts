import {
	DoubleSide,
	Mesh,
	MeshBasicMaterial,
	RingGeometry,
	type Texture,
} from "three";
import { KM, SEGMENTS } from "../constants";

export class PlanetRings extends Mesh {
	constructor(
		data: { innerRadius: number; outerRadius: number },
		texture: Texture,
	) {
		const geometry = new RingGeometry(
			data.innerRadius * KM,
			data.outerRadius * KM,
			2 * SEGMENTS,
			2 * SEGMENTS,
		);
		geometry.rotateX(Math.PI / 2);

		super(
			geometry,
			new MeshBasicMaterial({
				map: texture,
				side: DoubleSide,
				transparent: true,
				opacity: 0.5,
				depthWrite: false,
			}),
		);
	}
}
