import {
	Mesh,
	type Object3D,
	type PerspectiveCamera,
	Points,
	Vector3,
} from "three";
import { VIEW_ANGLE } from "./constants";
import { getViewportSize } from "./viewport";

export function setObjectVisible(root: Object3D, visible: boolean) {
	root.traverse((child) => {
		if (child instanceof Mesh || child instanceof Points) {
			child.visible = visible;
		}
	});
	root.visible = visible;
}

export function gaussianRandom(): number {
	return (
		-0.5 +
		Math.sqrt(-2 * Math.log(Math.random())) *
			Math.cos(2 * Math.PI * Math.random())
	);
}

export function getScreenPosition(
	obj: Object3D,
	camera: PerspectiveCamera,
	offsetY = 0,
) {
	if (!obj.visible) {
		return null;
	}

	const vector = new Vector3();
	const { width, height } = getViewportSize();

	const widthHalf = 0.5 * width;
	const heightHalf = 0.5 * height;

	obj.updateMatrixWorld();
	vector.setFromMatrixPosition(obj.matrixWorld);
	vector.y += offsetY;
	vector.project(camera);

	vector.x = vector.x * widthHalf + widthHalf;
	vector.y = -vector.y * heightHalf + heightHalf;

	if (
		vector.z < 1 &&
		vector.x > 0 &&
		vector.x < width &&
		vector.y > 0 &&
		vector.y < height
	) {
		const distance = camera.position.distanceTo(obj.position);
		const span = Math.atan(VIEW_ANGLE / 2) * distance;
		const factor = 1 / (1 + Math.log10(span));
		vector.z = 0.75 + factor;
		return vector;
	}
	return null;
}

export function createTextLabel(text: string, color: string) {
	const div = document.createElement("div");
	div.className = "object-label";
	div.style.color = color;
	div.style.display = "";
	div.innerHTML = text;
	return div;
}
