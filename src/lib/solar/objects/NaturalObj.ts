import {
	LessEqualDepth,
	Mesh,
	MeshLambertMaterial,
	MeshPhongMaterial,
	type MeshPhongMaterialParameters,
	SphereGeometry,
	Vector2,
} from "three";
import { KM, SEGMENTS } from "../constants";
import type { SolarSystemDataNode, TextureSet } from "../types";
import { OrbitingObj } from "./OrbitingObj";
import type { SolarSysObj } from "./SolarSysObj";

export class NaturalObj extends OrbitingObj {
	constructor(
		data: SolarSystemDataNode,
		textures: TextureSet,
		orbitsAround: SolarSysObj,
	) {
		const materialOptions: MeshPhongMaterialParameters = {
			color: data.baseColor ?? 0xffffff,
			map: textures.surface,
			depthFunc: LessEqualDepth,
			depthTest: true,
			depthWrite: true,
			shininess: 0,
		};

		if (textures.normal) {
			materialOptions.normalMap = textures.normal;
			materialOptions.normalScale = new Vector2(0.25, 0.25);
		}
		if (textures.specular) {
			materialOptions.specularMap = textures.specular;
			materialOptions.specular = 0x555555;
			materialOptions.shininess = 20;
		}
		if (textures.bump) {
			materialOptions.bumpMap = textures.bump;
			materialOptions.bumpScale = 1.0;
		}

		super(
			new SphereGeometry((data.radius ?? 0) * KM, SEGMENTS, SEGMENTS),
			new MeshPhongMaterial(materialOptions),
			data,
			orbitsAround,
		);

		const mesh = this.mesh as Mesh;
		this.radius = (data.radius ?? 0) * KM;

		if (data.ellipsoidParams) {
			const width = 2 * (data.radius ?? 0);
			mesh.geometry.scale(
				1.0,
				data.ellipsoidParams.height / width,
				data.ellipsoidParams.depth / width,
			);
		}

		if (textures.atmosphere) {
			mesh.add(
				new Mesh(
					mesh.geometry.clone(),
					new MeshLambertMaterial({
						map: textures.atmosphere,
						transparent: true,
						depthFunc: LessEqualDepth,
						depthTest: true,
						depthWrite: true,
					}),
				),
			);
		}
	}
}
