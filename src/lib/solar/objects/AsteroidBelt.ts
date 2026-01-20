import {
	BufferAttribute,
	BufferGeometry,
	Group,
	MathUtils,
	Mesh,
	MeshLambertMaterial,
	Points,
	PointsMaterial,
	SphereGeometry,
} from "three";
import { AU } from "../constants";
import type { SolarSystemDataNode } from "../types";
import { gaussianRandom, setObjectVisible } from "../utils";
import type { SolarSysObj } from "./SolarSysObj";

export class AsteroidBelt extends Group {
	color: number | string;
	innerRadius: number;
	outerRadius: number;

	constructor(data: SolarSystemDataNode, orbitsAround: SolarSysObj) {
		super();
		this.name = data.name;
		this.position.copy(orbitsAround.position);
		this.color = data.baseColor ?? 0xffffff;
		this.innerRadius = data.innerRadius ?? 0;
		this.outerRadius = data.outerRadius ?? 0;
	}

	initialize() {
		const smallAsteroidsGeometry = [new BufferGeometry(), new BufferGeometry()];
		const positions = [new Float32Array(1250 * 3), new Float32Array(1250 * 3)];

		for (let i = 0; i < 2500; i++) {
			const angle = MathUtils.randFloat(0, 2 * Math.PI);
			const distance =
				MathUtils.randFloat(this.innerRadius, this.outerRadius) * AU;
			const positionY = gaussianRandom() * (AU / 4);

			const index = i < 1250 ? 0 : 1;
			const offset = (i % 1250) * 3;

			positions[index][offset] = Math.cos(angle) * distance;
			positions[index][offset + 1] = positionY;
			positions[index][offset + 2] = Math.sin(angle) * distance;
		}

		for (let i = 0; i < 2; i++) {
			smallAsteroidsGeometry[i].setAttribute(
				"position",
				new BufferAttribute(positions[i], 3),
			);
		}

		const smallAsteroidsMaterial = [
			new PointsMaterial({ color: this.color, size: 1.125 }),
			new PointsMaterial({ color: this.color, size: 1.5 }),
		];

		this.add(new Points(smallAsteroidsGeometry[0], smallAsteroidsMaterial[0]));
		this.add(new Points(smallAsteroidsGeometry[1], smallAsteroidsMaterial[1]));

		const asteroidMaterial = new MeshLambertMaterial({ color: this.color });
		for (let i = 0; i < 100; i++) {
			const size = MathUtils.randFloat(10, 240);
			const shape1 = MathUtils.randFloat(4, 10);
			const shape2 = MathUtils.randFloat(4, 10);
			const distance =
				MathUtils.randFloat(this.innerRadius, this.outerRadius) * AU;
			const positionY = gaussianRandom() * (AU / 4);

			const asteroid = new Mesh(
				new SphereGeometry(size, shape1, shape2),
				asteroidMaterial,
			);

			asteroid.position.y = positionY;
			const orbitDistance = MathUtils.randFloat(0, 2 * Math.PI);
			asteroid.position.x = Math.cos(orbitDistance) * distance;
			asteroid.position.z = Math.sin(orbitDistance) * distance;

			this.add(asteroid);
		}
	}

	setVisible(visible: boolean) {
		setObjectVisible(this, visible);
	}
}
