/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace JSX {
	interface IntrinsicElements {
		meshLineGeometry: any;
		meshLineMaterial: any;
	}
}

declare global {
	interface Window {
		MP_SDK: any;
	}
}

export {};
