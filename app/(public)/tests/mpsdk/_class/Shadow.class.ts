/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import type { Scene } from "../../../../../public/matterport-assets/sdk";

/** ============ class White background ============== */
class Shadow implements Scene.IComponent {
  componentType: string;
  material: THREE.ShadowMaterial | null;
  inputs: {
    visible: boolean;
    castShadow: boolean;
    receiveShadow: boolean;
  };
  outputs: any;
  context: Scene.IComponentContext;
  onDestroy: () => void;
  onInit: () => void;
  events: any;
  bind: any;
  bindEvent: any;
  notify: any;
  spyOnEvent: any;
  constructor() {
    this.componentType = "mp.shadow";
    this.inputs = {
      visible: true,
      castShadow: true,
      receiveShadow: true,
    };
    this.context = {
      three: THREE,
      renderer: new THREE.WebGLRenderer(),
      scene: new THREE.Scene(),
      camera: new THREE.PerspectiveCamera(),
    };
    this.material = null;
    this.onInit = function () {
      const THREE = this.context.three;
      const node = new THREE.Object3D();
      const geo = new THREE.PlaneGeometry(1, 1);

      // shadow material 로 생성
      this.material = new THREE.ShadowMaterial({
        transparent: true,
        color: 0x000000,
        opacity: 0.3,
        side: THREE.DoubleSide,
        fog: true,
      });

      const mesh = new THREE.Mesh(geo, this.material);
      mesh.position.set(2, 0.1, -1);
      mesh.scale.set(10, 10, 10);
      mesh.rotation.set(1.57, 0, 0);
      node.add(mesh);

      mesh.receiveShadow = true;
      node.name = "shadowMat";
      mesh.name = "shadowMat";

      this.outputs.objectRoot = mesh;
      this.outputs.collider = mesh;
    };

    this.onDestroy = function () {
      if (this.material) {
        this.material.dispose();
      }
    };
  }
}
export default Shadow;
