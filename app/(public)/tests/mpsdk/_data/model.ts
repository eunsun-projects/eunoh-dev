enum Component {
	OBJ_LOADER = "mp.objLoader",
	FBX_LOADER = "mp.fbxLoader",
	DAE_LOADER = "mp.daeLoader",
	GLTF_LOADER = "mp.gltfLoader",
	SCROLLING_TUBE = "mp.scrollingTube",
	TRANSFORM_CONTROLS = "mp.transformControls",
	LIGHTS_COMPONENT = "mp.lights",
	POINT_LIGHT = "mp.pointLight",
	DIRECTIONAL_LIGHT = "mp.directionalLight",
	AMBIENT_LIGHT = "mp.ambientLight",
	CAMERA = "mp.camera",
	INPUT = "mp.input",
	XR = "mp.xr",
}

export const model = [
	{
		id: "01_TheDawnofChristianity",
		type: Component.GLTF_LOADER,
		inputs: {
			url: "/assets/mpsdk/01_TheDawnofChristianity.glb",
		},
		position: [4, 0, -1],
		rotation: [0, 0, 0],
		scale: [0.3, 0.3, 0.3],
		shadowScale: {
			x: 1,
			y: 1,
			z: 1,
		},
		shadowPosition: {
			x: 2,
			y: 0.02,
			z: -1,
		},
	},
	{
		id: "02",
		type: Component.GLTF_LOADER,
		inputs: {
			url: "",
		},
		position: [0, 0, 0],
		rotation: [0, 0, 0],
		scale: [0, 0, 0],
		shadowScale: {
			x: 0,
			y: 0,
			z: 0,
		},
		shadowPosition: {
			x: 0,
			y: 0,
			z: 0,
		},
	},
];
