import { ArtificialObj } from "./objects/ArtificialObj";
import { AsteroidBelt } from "./objects/AsteroidBelt";
import { NaturalObj } from "./objects/NaturalObj";
import { PlanetRings } from "./objects/PlanetRings";
import type { SolarSysObj } from "./objects/SolarSysObj";
import { Star } from "./objects/Star";
import type {
	SolarSystemDataNode,
	SolarSystemMap,
	TextureResources,
} from "./types";

export function parseSolarSystemData(
	data: SolarSystemDataNode,
	textures: TextureResources,
	parent: SolarSysObj | null = null,
): SolarSystemMap {
	const result: SolarSystemMap = {};
	const name = data.name;

	if (data.radius) {
		if (!parent) {
			result[name] = new Star(data, textures.lensFlare);
		} else {
			const textureSet = textures.textures[name];
			if (!textureSet) {
				throw new Error(`Missing textures for ${name}`);
			}
			result[name] = new NaturalObj(data, textureSet, parent);
		}
	} else if (name === "rings") {
		if (parent && data.innerRadius && data.outerRadius) {
			const ringTexture = textures.textures[parent.name]?.rings;
			if (ringTexture) {
				const rings = new PlanetRings(
					{
						innerRadius: data.innerRadius,
						outerRadius: data.outerRadius,
					},
					ringTexture,
				);
				parent.mesh.add(rings);
			}
		}
	} else if (
		typeof data.innerRadius === "number" &&
		typeof data.outerRadius === "number"
	) {
		if (parent) {
			result[name] = new AsteroidBelt(data, parent);
		}
	} else {
		if (parent) {
			result[name] = new ArtificialObj(data, parent);
		}
	}

	if (data.orbitingObjects) {
		for (const orbitingObj of data.orbitingObjects) {
			const nextParent = (result[name] as SolarSysObj | undefined) ?? parent;
			if (nextParent) {
				Object.assign(
					result,
					parseSolarSystemData(orbitingObj, textures, nextParent),
				);
			}
		}
	}
	return result;
}
