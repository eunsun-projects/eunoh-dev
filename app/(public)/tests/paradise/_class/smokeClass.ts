import * as THREE from "three";

export default class SmokeClass {
  private _canvas: HTMLCanvasElement;
  private _width: number;
  private _height: number;
  private _cubeSineDriver: number;
  private _clock: THREE.Clock;
  private _renderer: THREE.WebGLRenderer;
  private _scene: THREE.Scene;
  private _camera: THREE.PerspectiveCamera;
  private _box: THREE.Mesh;
  private _smokeParticles: THREE.Mesh[];
  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._smokeParticles = [];
    const fixedWidth = canvas.clientWidth;
    const fixedHeight = canvas.clientHeight;
    this._width = fixedWidth;
    this._height = fixedHeight;

    this._cubeSineDriver = 0;

    this._clock = new THREE.Clock();

    //렌더러만들기
    const renderer = new THREE.WebGLRenderer({ canvas: canvas }); // 오른쪽 canvas는 this._canvas
    this._renderer = renderer;
    //씬 만들기
    const scene = new THREE.Scene();
    this._scene = scene;
    //카메라 만들기
    const camera = new THREE.PerspectiveCamera(
      75,
      fixedWidth / fixedHeight,
      1,
      10000,
    );
    this._camera = camera;

    camera.position.z = 1000;

    //빛 만들기
    const light = new THREE.DirectionalLight(0xffffff, 0.75);

    light.position.set(-1, 0, 1);
    scene.add(light);

    //물체만들기
    //아직 씬에 물체를 추가하지 않았음
    const meshGeometry = new THREE.BoxGeometry(200, 200, 200);
    const meshMaterial = new THREE.MeshLambertMaterial({
      color: 0xaa6666,
      wireframe: false,
    });

    const box = new THREE.Mesh(meshGeometry, meshMaterial);
    this._box = box;
    this.addParticles();
  }

  addParticles() {
    const textureLoader = new THREE.TextureLoader();
    const smokeParticles: THREE.Mesh[] = [];
    this._smokeParticles = smokeParticles;

    textureLoader.load("/assets/paradise/clouds.png", (texture) => {
      const smokeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: texture,
        transparent: true,
      });
      if (smokeMaterial.map) {
        smokeMaterial.map.minFilter = THREE.LinearFilter;
      }
      const smokeGeometry = new THREE.PlaneGeometry(300, 300);

      const smokeMeshes = [];
      let limit = 30;

      while (limit--) {
        smokeMeshes[limit] = new THREE.Mesh(smokeGeometry, smokeMaterial);
        smokeMeshes[limit].position.set(
          Math.random() * 500 - 250,
          Math.random() * 500 - 250,
          Math.random() * 1000 - 100,
        );
        smokeMeshes[limit].rotation.z = Math.random() * 360;
        smokeParticles.push(smokeMeshes[limit]);
        this._scene.add(smokeMeshes[limit]);
      }
    });
  }

  resize(canvas: HTMLDivElement) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const aspect = width / height; //비율 구하기
    this._camera.aspect = aspect;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(width, height);
  }

  evolveSmoke(delta: number) {
    let smokeParticlesLength = this._smokeParticles.length;

    while (smokeParticlesLength--) {
      this._smokeParticles[smokeParticlesLength].rotation.z += delta * 0.2;
    }
  }

  preRender() {
    this.evolveSmoke(this._clock.getDelta());
    this._cubeSineDriver += 0.01;

    this._box.rotation.x += 0.005;
    this._box.rotation.y += 0.01;
    this._box.position.z = 100 + Math.sin(this._cubeSineDriver) * 500;
    this._renderer.render(this._scene, this._camera);
  }

  render() {
    this.preRender();
  }
}
