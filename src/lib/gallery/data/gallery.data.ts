import * as THREE from "three";

export const galleryLights = [
	{
		id: 0,
		target: "painting",
		position: new THREE.Vector3(0, 18, -32),
		l: 7,
		shadow: true,
	},
	{
		id: 1,
		target: "sculpture1",
		position: new THREE.Vector3(0, 20, -16),
		l: 7,
		shadow: true,
	},
	{
		id: 2,
		target: "sculpture2",
		position: new THREE.Vector3(0, 8, 43),
		l: 4,
		shadow: true,
	},
];

export const galleryTextures = [
	{
		id: 0,
		to: "floor",
		for: "square",
		src: "/assets/gallery/img/square_floor.png",
	},
	{
		id: 1,
		to: "wall",
		for: "square",
		src: "/assets/gallery/img/square_wall.png",
	},
	{
		id: 2,
		to: "ceiling",
		for: "square",
		src: "/assets/gallery/img/square_wall.png",
	},
	{
		id: 3,
		to: "floor",
		for: "rect",
		src: "/assets/gallery/img/rect_floor.png",
	},
	{ id: 4, to: "wall", for: "rect", src: "/assets/gallery/img/rect_wall.png" },
	{
		id: 5,
		to: "ceiling",
		for: "rect",
		src: "/assets/gallery/img/rect_ceiling.png",
	},
	{ id: 6, to: "floor", for: "dig", src: "/assets/gallery/img/dig_wall.png" },
	{ id: 7, to: "wall", for: "dig", src: "/assets/gallery/img/dig_floor.png" },
	{
		id: 8,
		to: "ceiling",
		for: "dig",
		src: "/assets/gallery/img/dig_floor.png",
	},
];
