/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace JSX {
  interface IntrinsicElements {
    meshLineGeometry: any;
    meshLineMaterial: any;
  }
}

// global.d.ts (프로젝트 최상단, or /app/global.d.ts)
declare global {
  interface Window {
    MP_SDK?: {
      connect: (iframe: HTMLElement, options?: any) => Promise<any>;
      // etc...
    };
  }
}

export {};
