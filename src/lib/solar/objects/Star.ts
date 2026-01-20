import type { Texture } from "three";
import {
	AdditiveBlending,
	MeshBasicMaterial,
	PointLight,
	SphereGeometry,
	Sprite,
	SpriteMaterial,
	Vector2,
} from "three";
import { FAR, KM, NEAR, SEGMENTS, TEXTURE_SIZE } from "../constants";
import type { SolarSystemDataNode } from "../types";
import { SolarSysObj } from "./SolarSysObj";

export class Star extends SolarSysObj {
	light: PointLight;
	orbitsAround = null;

	constructor(data: SolarSystemDataNode, lensFlare: Texture) {
		super(
			data.name,
			new SphereGeometry((data.radius ?? 0) * KM, SEGMENTS, SEGMENTS),
			new MeshBasicMaterial({
				color: data.baseColor ?? 0xffffff,
				transparent: true,
				depthWrite: false,
			}),
		);

		this.labelText = data.name === "태양" ? "태양(1/10)" : data.name;
		this.radius = (data.radius ?? 0) * KM;

		this.light = new PointLight(0xffffff, 3, 0, 0);
		this.light.position.copy(this.position);

		this.light.shadow.mapSize.width = TEXTURE_SIZE;
		this.light.shadow.mapSize.height = TEXTURE_SIZE;
		this.light.shadow.camera.near = NEAR;
		this.light.shadow.camera.far = FAR;
		this.add(this.light);

		const coronaMaterial = new SpriteMaterial({
			map: lensFlare,
			color: 0xffffff,
			transparent: true,
			blending: AdditiveBlending,
			depthWrite: false,
			depthTest: false,
		});
		const coronaSprite = new Sprite(coronaMaterial);
		coronaSprite.center = new Vector2(0.50525, 0.4825);
		coronaSprite.rotation.y = 20;
		coronaSprite.scale.set(
			this.radius * 32,
			this.radius * 32,
			this.radius * 32,
		);
		coronaSprite.renderOrder = 1;
		this.mesh.add(coronaSprite);
	}
}
