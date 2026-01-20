import {
	type AxesHelper,
	type BufferGeometry,
	Color,
	Group,
	type Material,
	Mesh,
	type Object3D,
	Vector3,
} from "three";
import { setObjectVisible } from "../utils";

export class SolarSysObj extends Group {
	mesh: Object3D;
	color: Color;
	radius = 0;
	axesHelper?: AxesHelper;
	label?: HTMLDivElement;
	labelText?: string;
	private baseScale = new Vector3(1, 1, 1);
	private currentScale = 1;

	constructor(name: string, geometry: BufferGeometry, material: Material) {
		super();
		this.mesh = new Mesh(geometry, material);
		this.add(this.mesh);
		this.name = name;

		const materialWithColor = material as Material & {
			color?: Color;
			map?: unknown;
		};
		this.color = materialWithColor.color?.clone() ?? new Color(0xffffff);
		if (materialWithColor.map && materialWithColor.color) {
			materialWithColor.color.set(0xffffff);
		}
	}

	setScale(scale = 1.0) {
		this.currentScale = scale;
		this.mesh.scale.set(
			this.baseScale.x * scale,
			this.baseScale.y * scale,
			this.baseScale.z * scale,
		);
	}

	getScale() {
		return this.currentScale;
	}

	setBaseScale(x: number, y: number, z: number) {
		this.baseScale.set(x, y, z);
		this.setScale(this.currentScale);
	}

	setVisible(visible: boolean) {
		setObjectVisible(this, visible);
	}
}
