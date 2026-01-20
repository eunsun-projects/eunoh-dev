import {
	Box3,
	BufferGeometry,
	Group,
	Mesh,
	MeshPhongMaterial,
	Sphere,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { SolarSystemDataNode } from "../types";
import { OrbitingObj } from "./OrbitingObj";
import type { SolarSysObj } from "./SolarSysObj";

export class ArtificialObj extends OrbitingObj {
	constructor(data: SolarSystemDataNode, orbitsAround: SolarSysObj) {
		super(
			new BufferGeometry(),
			new MeshPhongMaterial({ color: data.baseColor ?? 0xffffff }),
			data,
			orbitsAround,
		);

		const loader = new GLTFLoader();

		if (!data.model) {
			return;
		}

		loader.load(data.model, (gltf) => {
			const wrapper = new Group();
			wrapper.add(gltf.scene);

			this.remove(this.mesh);
			this.mesh = wrapper;
			this.add(this.mesh);

			const scale = data.geometryScale ?? [1, 1, 1];
			if (data.modelOffset) {
				gltf.scene.position.set(
					data.modelOffset[0] * scale[0],
					data.modelOffset[1] * scale[1],
					data.modelOffset[2] * scale[2],
				);
			}

			if (data.baseColor) {
				gltf.scene.traverse((child) => {
					if (child instanceof Mesh) {
						const materials = Array.isArray(child.material)
							? child.material
							: [child.material];
						for (const material of materials) {
							if ("color" in material && material.color) {
								material.color.set(data.baseColor as string | number);
							}
						}
					}
				});
			}

			this.setBaseScale(scale[0], scale[1], scale[2]);

			const box = new Box3().setFromObject(this.mesh);
			const sphere = new Sphere();
			box.getBoundingSphere(sphere);
			this.radius = sphere.radius / this.getScale();
		});
	}
}
