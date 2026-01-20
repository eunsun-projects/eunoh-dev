let viewportWidth = 1;
let viewportHeight = 1;

export function setViewportSize(width: number, height: number) {
	viewportWidth = width;
	viewportHeight = height;
}

export function getViewportSize() {
	return { width: viewportWidth, height: viewportHeight };
}
