import * as THREE from "three";
import type {
	GalleryActions,
	GalleryInfoActions,
} from "@/components/gallery/gallery-loading-context";
import type { srcLights, srcTextures } from "../data/src.data";
import Gallery, {
	type GalleryModel,
	type GalleryModelUserdata,
	type GalleryPaintingItem,
	type SceneObjectWithMeta,
} from "./gallery.class";

interface constructorParams {
	canvasdiv: HTMLDivElement;
	title: string;
	actions: GalleryActions;
	infoActions: GalleryInfoActions;
	textures: typeof srcTextures;
	paintings: GalleryPaintingItem[];
	models: GalleryModel[];
	lights: typeof srcLights;
}

export default class Src extends Gallery {
	constructor({
		canvasdiv,
		title,
		actions,
		infoActions,
		textures,
		paintings,
		models,
		lights,
	}: constructorParams) {
		super({
			canvasdiv,
			title,
			actions,
			infoActions,
			textures,
			paintings,
			models,
			lights,
		});
	}
	//기본 카메라 설정
	initCamera() {
		if (!this._camera || !this._scene) return;
		if (this.title === "src") {
			// 공간에 따라 시작위치 변경 (갤러리 확대에 맞춤)
			this._camera.position.set(0, this.player.height, 60);
			this._camera.lookAt(new THREE.Vector3(0, this.player.height, 0));
			this._scene.add(this._camera);
		}
	}
	//기본 빛 추가
	addWorldLight() {
		if (!this._scene) return;
		if (this.title === "src") {
			const ambLight = new THREE.AmbientLight(0xfffff0, 0.01);
			this._scene.add(ambLight);
			const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.01);
			this._scene.add(light);
		}
	}
	// 벽 바닥 천장 추가
	addWallFloorCeiling() {
		let fTexture: string | undefined;
		let wTexture: string | undefined;
		let cTexture: string | undefined;
		if (this.title === "src") {
			fTexture = this.textures[0].src;
			wTexture = this.textures[1].src;
			cTexture = this.textures[2].src;
		}

		// Texture of the floor 바닥 생성
		this.loadTexture(fTexture!)
			.then((tex: unknown) => {
				const texture = tex as THREE.Texture;
				let planeGeometry: THREE.PlaneGeometry | undefined;
				if (this.title === "src") {
					planeGeometry = new THREE.PlaneGeometry(115, 150); // 갤러리 확대
				}

				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
				texture.repeat.set(1, 1);

				const material = new THREE.MeshPhongMaterial({
					map: texture,
					side: THREE.DoubleSide,
				});

				const floorPlane = new THREE.Mesh(planeGeometry, material);
				floorPlane.receiveShadow = true;
				floorPlane.rotation.x = Math.PI / 2;
				floorPlane.position.y = -Math.PI;
				if (this._scene) {
					this._scene.add(floorPlane);
				}

				this.loadingCount += 1;
				this.actions.increase();
			})
			.catch((error) => console.log(error));

		// Create wall material 벽 생성
		this.loadTexture(wTexture!)
			.then((tex: unknown) => {
				const wallTexture = tex as THREE.Texture;
				let frontWall: THREE.Mesh | undefined;
				let leftWall: THREE.Mesh | undefined;
				let rightWall: THREE.Mesh | undefined;
				let backWall: THREE.Mesh | undefined;
				// Front Wall
				if (this.title === "src") {
					wallTexture.wrapS = THREE.RepeatWrapping;
					wallTexture.wrapT = THREE.RepeatWrapping;
					wallTexture.repeat.set(2, 2);

					frontWall = new THREE.Mesh(
						new THREE.BoxGeometry(80, 30, 0.001), // (가로, 높이, 두께) 갤러리 확대
						new THREE.MeshLambertMaterial({ map: wallTexture }),
					);
					frontWall.position.z = -67;

					// Left Wall
					leftWall = new THREE.Mesh(
						new THREE.BoxGeometry(135, 30, 0.001),
						new THREE.MeshLambertMaterial({ map: wallTexture }),
					);
					leftWall.rotation.y = Math.PI / 2;
					leftWall.position.x = -40;

					// Right Wall
					rightWall = new THREE.Mesh(
						new THREE.BoxGeometry(135, 30, 0.001),
						new THREE.MeshLambertMaterial({ map: wallTexture }),
					);
					rightWall.position.x = 40;
					rightWall.rotation.y = Math.PI / 2;

					// Back Wall
					backWall = new THREE.Mesh(
						new THREE.BoxGeometry(80, 30, 0.001),
						new THREE.MeshLambertMaterial({ map: wallTexture }),
					);
					backWall.position.z = 67;

					if (this.wallGroup) {
						this.wallGroup.add(frontWall, backWall, leftWall, rightWall);
					}
				}
				// Enable shadows on objects
				if (frontWall) {
					frontWall.castShadow = true;
					frontWall.receiveShadow = true;
				}
				if (leftWall) {
					leftWall.castShadow = true;
					leftWall.receiveShadow = true;
				}
				if (rightWall) {
					rightWall.castShadow = true;
					rightWall.receiveShadow = true;
				}
				if (backWall) {
					backWall.castShadow = true;
					backWall.receiveShadow = true;
				}
				if (this._scene && this.wallGroup) {
					this._scene.add(this.wallGroup);
				}
				this.loadingCount += 1;
				this.actions.increase();
			})
			.catch((err) => console.log(err));

		// Create the ceiling 천장 생성
		this.loadTexture(cTexture!) // load the image/texture
			.then((tex: unknown) => {
				const ceilingTexture = tex as THREE.Texture;
				let ceilingGeometry: THREE.PlaneGeometry | undefined;
				ceilingTexture.wrapS = THREE.RepeatWrapping;
				ceilingTexture.wrapT = THREE.RepeatWrapping;
				ceilingTexture.repeat.set(5, 5);
				if (this.title === "src") {
					ceilingGeometry = new THREE.PlaneGeometry(135, 150);
				}
				const ceilingMaterial = new THREE.MeshBasicMaterial({
					map: ceilingTexture,
				});
				const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
				ceilingPlane.receiveShadow = true;

				ceilingPlane.rotation.x = Math.PI / 2; // 90 degrees
				ceilingPlane.position.y = 15;

				if (this._scene) {
					this._scene.add(ceilingPlane);
				}

				this.loadingCount += 1;
				this.actions.increase();
			})
			.catch((err) => console.log(err));
	}
	/**
	 * 텍스처 유닛 16개 제한 회피: MeshStandardMaterial 등에서
	 * map만 남기고 나머지 맵을 제거해 유닛 사용을 줄인다.
	 */
	private reduceMaterialTextureUnits(scene: THREE.Object3D) {
		scene.traverse((object) => {
			const mesh = object as THREE.Mesh;
			if (!mesh.material) return;
			const materials = Array.isArray(mesh.material)
				? mesh.material
				: [mesh.material];
			for (const mat of materials) {
				const m = mat as THREE.MeshStandardMaterial & {
					normalMap?: THREE.Texture | null;
					roughnessMap?: THREE.Texture | null;
					metalnessMap?: THREE.Texture | null;
					aoMap?: THREE.Texture | null;
					envMap?: THREE.Texture | null;
				};
				if (m.envMap) m.envMap = null;
				if (m.normalMap) m.normalMap = null;
				if (m.roughnessMap) m.roughnessMap = null;
				if (m.metalnessMap) m.metalnessMap = null;
				if (m.aoMap) m.aoMap = null;
			}
		});
	}

	// 모델 로더 업데이트
	modelLoad(model: any, position: THREE.Vector3) {
		return new Promise((resolve, reject) => {
			this._modelLoader!.load(
				model.obj,
				(gltf) => {
					const box = new THREE.Box3().setFromObject(gltf.scene);
					const size = box.getSize(new THREE.Vector3());
					const scaleFactor = 5 / Math.max(size.x, size.y, size.z);
					gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor);
					if (this.objGroup) {
						this.objGroup.add(gltf.scene);
					}

					// MAX_TEXTURE_IMAGE_UNITS(16) 초과 방지: map 외 보조 맵 제거
					this.reduceMaterialTextureUnits(gltf.scene);

					gltf.scene.traverse((object: any) => {
						if (object.isMesh) {
							object.castShadow = true;
							object.receiveShadow = true;
						} else {
							object.castShadow = true;
							object.receiveShadow = true;
						}
					});
					gltf.scene.castShadow = true;
					gltf.scene.receiveShadow = true;
					gltf.scene.name = model.userdata.info.title;
					gltf.scene.userData = model.userdata;
					(gltf.scene as any).number = model._id;
					(gltf.scene as any).scaleFactor = scaleFactor;
					(gltf.scene as any).children[0].customProperty = "obj";
					gltf.scene.position.set(position.x, position.y, position.z);
					if (this.objGroup) {
						(this.objGroup as any).customProperty = "objsGroup";
						if (this._scene && this.objGroup) {
							this._scene.add(this.objGroup);
						}
					}
					resolve(gltf.scene);
				},
				(xhr) => {
					const loadCounter = (xhr.loaded / xhr.total) * 100;
					if (loadCounter < 100) {
						if (this.loadingBoxGroup) {
							this.loadingBoxGroup.add(this.loadingBox(position));
							if (this._scene && this.loadingBoxGroup) {
								this._scene.add(this.loadingBoxGroup);
							}
						}
					} else if (loadCounter === 100) {
						if (this._scene && this.loadingBoxGroup) {
							this._scene.remove(this.loadingBoxGroup);
						}
					}
				},
				(error) => {
					console.error(error);
					reject(error);
				},
			);
		});
	}
	createDirectionalLight(
		position: THREE.Vector3,
		intensity: number,
		_targetPosition: THREE.Vector3 | undefined,
		shadow: boolean,
	) {
		const directionalLight = new THREE.DirectionalLight(0xffffff, intensity);
		directionalLight.position.set(position.x, position.y, position.z);
		directionalLight.castShadow = shadow;

		if (shadow) {
			directionalLight.shadow.mapSize.width = 2048;
			directionalLight.shadow.mapSize.height = 2048;
			directionalLight.shadow.camera.near = 0.5;
			directionalLight.shadow.camera.far = 200;
			// src 공간(바닥 115x150, 벽 x=±40 z=±67)을 덮도록 orthographic 범위 설정 (여유 마진 포함)
			directionalLight.shadow.camera.left = -55;
			directionalLight.shadow.camera.right = 55;
			directionalLight.shadow.camera.bottom = -85;
			directionalLight.shadow.camera.top = 85;
			directionalLight.shadow.bias = -0.0001;
			directionalLight.shadow.normalBias = 0.02;
		}
		return directionalLight;
	}
	addModelAndLight() {
		// 예시 공간에는 모델이 없으므로 아직 쓸일 없는 함수
		if (this.models.length > 0) {
			this.models.forEach((e, _i) => {
				this.modelLoad(e, e.position)
					.then((scene: unknown) => {
						const s = scene as SceneObjectWithMeta;
						this.infoArr.push(s.userData as GalleryModelUserdata);
						this.mergeArr.push(s.position);
						this.scaleFactorArr.push(s.scaleFactor ?? 1);
						this.actions.increase();
						return s;
					})
					.catch((err) => console.log(err));
			});
		} else {
			this.actions.increase();
		}
	}
	addDirectionalLight() {
		this.lights.forEach((light) => {
			if (!this._scene) return;

			const lightObject = this.createDirectionalLight(
				light.position,
				light.l,
				undefined,
				light.shadow,
			);
			this._scene.add(lightObject.target);
			this._scene.add(lightObject);
		});
	}
	render() {
		if (!this.running) return;
		if (this._renderer && this._scene && this._camera) {
			this._renderer.render(this._scene, this._camera);
		}
		this.loopForCollision();
		this.informDisplay();
		this.controlSet();
		this.ixMovementUpdate();
	}
}
