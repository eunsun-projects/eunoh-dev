import * as THREE from "three";

export const smallGalleryLights = [
	{
		id: 0,
		target: "The Dawn of Christianity",
		position: new THREE.Vector3(0, 10, 10),
		l: 200,
		shadow: true,
	},
];

export const smallGalleryModels = [
	{
		id: 0,
		userdata: {
			type: "gltf",
			info: {
				title: "The Dawn of Christianity",
				artist: "ERASTUS DOW PALMER",
				year: "1817~1904",
				material: "marble",
				desc: "TheDawnofChristianity sample",
			},
		},
		position: new THREE.Vector3(0, -3.2, 0),
		obj: "/assets/gallery/small-gallery/objs/01_TheDawnofChristianity.glb",
		poster: "",
		pedestal: false,
	},
];

export const smallGalleryTextures = [
	{
		id: 0,
		to: "floor",
		for: "floor",
		src: "/assets/gallery/img/square_floor.png",
	},
	{
		id: 1,
		to: "wall",
		for: "wall",
		src: "/assets/gallery/img/square_wall.png",
	},
	{
		id: 2,
		to: "ceiling",
		for: "ceiling",
		src: "/assets/gallery/img/square_wall.png",
	},
];
