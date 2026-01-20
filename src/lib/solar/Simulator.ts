import {
	AdditiveBlending,
	AmbientLight,
	AxesHelper,
	BufferAttribute,
	BufferGeometry,
	Clock,
	DoubleSide,
	Mesh,
	MeshBasicMaterial,
	PCFSoftShadowMap,
	PerspectiveCamera,
	Points,
	PointsMaterial,
	RingGeometry,
	Scene,
	SRGBColorSpace,
	Vector3,
	WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { MeshLineMaterial } from "three.meshline";
import {
	AU,
	DEFAULT_SIZE_SCALE,
	FAR,
	NEAR,
	SEGMENTS,
	VIEW_ANGLE,
} from "./constants";
import { AsteroidBelt } from "./objects/AsteroidBelt";
import { OrbitingObj } from "./objects/OrbitingObj";
import { SolarSysObj } from "./objects/SolarSysObj";
import { Star } from "./objects/Star";
import type { SolarSystemMap } from "./types";
import { createTextLabel, getScreenPosition } from "./utils";
import { setViewportSize } from "./viewport";

const BG_SPHERE_RADIUS = FAR * 100;

export interface SimulatorOptions {
	container: HTMLElement;
	labelRoot?: HTMLElement;
}

export class Simulator {
	private container: HTMLElement;
	private labelRoot: HTMLElement;
	private renderer: WebGLRenderer;
	private universe: Scene;
	private camera: PerspectiveCamera;
	private controls: OrbitControls;
	private solarSystem?: SolarSystemMap;

	private orbitingObjects: OrbitingObj[] = [];
	private targetObj: SolarSysObj | null = null;
	private starField1: Points | null = null;
	private starField2: Points | null = null;
	private habitableZone: Mesh | null = null;
	private orbitsVisible = true;
	private labelsVisible = false;
	private followTarget = true;
	private lookingFrom = false;

	private currentDateTime: Date = new Date();
	private simulating = false;
	private staticUpdate = false;
	private speedFactor = 1;
	private clock = new Clock(false);
	private maxYear = 0;
	private onSimulationUpdatedCallback?: (date: Date) => void;
	private onSimulationStopCallback?: (message: string) => void;

	constructor(options: SimulatorOptions) {
		this.container = options.container;
		this.labelRoot = options.labelRoot ?? options.container;

		this.renderer = new WebGLRenderer({
			antialias: true,
			logarithmicDepthBuffer: true,
			preserveDrawingBuffer: true,
			alpha: true,
		});

		this.universe = new Scene();
		this.camera = new PerspectiveCamera(VIEW_ANGLE, 1, NEAR, FAR);
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
	}

	initialize(
		solarSystem: SolarSystemMap,
		targetName?: string,
		maxDistance = 200 * AU,
		maxYear = 0,
		initialZoom = 1,
	) {
		this.maxYear = maxYear;
		this.orbitingObjects = [];
		this.solarSystem = solarSystem;

		const candidateTarget = targetName ? solarSystem[targetName] : undefined;
		this.targetObj =
			(candidateTarget as SolarSysObj) ?? this.findDefaultTarget(solarSystem);

		this.renderer.setPixelRatio(this.detectPixelRatio());
		this.renderer.outputColorSpace = SRGBColorSpace;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = PCFSoftShadowMap;
		this.renderer.setClearColor(0x000000, 0.0);

		this.updateSimulationSize();
		this.container.appendChild(this.renderer.domElement);

		this.universe = new Scene();
		this.universe.add(new AmbientLight(0x333333));

		this.camera.lookAt(this.universe.position);
		this.universe.add(this.camera);

		this.currentDateTime = new Date();

		for (const obj of Object.values(solarSystem)) {
			this.universe.add(obj);
			if (obj instanceof OrbitingObj) {
				this.orbitingObjects.push(obj);
				obj.updatePosition(this.currentDateTime);
				obj.updateRotation(this.currentDateTime);
				obj.updateOrbitLine(this.currentDateTime);
				if (obj.orbit.line) {
					this.universe.add(obj.orbit.line);
				}
			} else if (obj instanceof AsteroidBelt) {
				obj.initialize();
			}
		}

		this.createStarField();

		this.controls.enableZoom = true;
		this.controls.enablePan = false;
		this.controls.autoRotate = false;
		this.controls.maxDistance = maxDistance;

		this.setObjectsScale(solarSystem, DEFAULT_SIZE_SCALE);
		this.setLabelsVisibility(solarSystem, false);

		if (this.targetObj) {
			this.lookAt(this.targetObj);
			if (initialZoom !== 1) {
				this.camera.position.multiplyScalar(initialZoom);
			}
		}

		this.renderer.render(this.universe, this.camera);
		requestAnimationFrame(() => this.render());
	}

	private render() {
		if (this.staticUpdate) {
			this.updateOrbitingObjects();
			this.onSimulationUpdatedCallback?.(this.currentDateTime);
			this.staticUpdate = false;
		} else if (this.simulating) {
			let elapsedMilliseconds = 0;
			if (this.clock.running) {
				this.clock.stop();
				elapsedMilliseconds =
					this.clock.getElapsedTime() * this.speedFactor * 1000;
				this.currentDateTime.setMilliseconds(
					this.currentDateTime.getMilliseconds() + elapsedMilliseconds,
				);
			}
			if (elapsedMilliseconds > 0) {
				if (this.currentDateTime.getFullYear() > this.maxYear) {
					this.simulating = false;
					this.onSimulationStopCallback?.(
						"Available data is valid only in the year range [1800, 2050]. Simulation stopped.",
					);
				} else {
					this.updateOrbitingObjects();
					this.onSimulationUpdatedCallback?.(this.currentDateTime);
				}
			}
			this.clock.start();
		}

		if (this.labelsVisible) {
			this.updateLabels();
		}

		this.controls.update();
		this.renderer.render(this.universe, this.camera);
		requestAnimationFrame(() => this.render());
	}

	private detectPixelRatio() {
		const devicePixelRatio = window.devicePixelRatio || 1;
		return devicePixelRatio < 1 ? devicePixelRatio : 2;
	}

	private updateLabels() {
		if (!this.solarSystem) {
			return;
		}

		for (const obj of Object.values(this.solarSystem)) {
			if (!(obj instanceof SolarSysObj) || !obj.visible) {
				continue;
			}
			if (obj instanceof OrbitingObj) {
				obj.updateObjLabel(this.labelRoot, this.camera);
			} else {
				this.updateObjLabel(obj);
			}
		}
	}

	private updateObjLabel(obj: SolarSysObj) {
		if (!obj.label) {
			const labelText = obj.labelText ?? obj.name;
			obj.label = createTextLabel(labelText, `#${obj.color.getHexString()}`);
			this.labelRoot.appendChild(obj.label);
		}
		const labelCoordinates = getScreenPosition(
			obj,
			this.camera,
			obj.radius * obj.getScale(),
		);
		if (labelCoordinates) {
			labelCoordinates.y -= obj.label.clientHeight;
			labelCoordinates.x -= obj.label.clientWidth / 2;
			const alpha = 1 / labelCoordinates.z;
			obj.label.style.transform = `translate(${labelCoordinates.x}px, ${labelCoordinates.y}px) scale(${labelCoordinates.z})`;
			obj.label.style.opacity = alpha.toString();
			obj.label.style.display = "";
		} else if (obj.label) {
			obj.label.style.display = "none";
		}
	}

	private updateOrbitingObjects() {
		for (const sysObj of this.orbitingObjects) {
			if (
				!sysObj.visible &&
				(!sysObj.objectAvailableListener ||
					!sysObj.isAvailable(this.currentDateTime))
			) {
				continue;
			}

			if (!sysObj.isAvailable(this.currentDateTime)) {
				sysObj.setVisible(false, false);
				if (sysObj.label) {
					sysObj.label.style.display = "none";
				}
				sysObj.objectAvailableListener = () => {
					sysObj.setVisible(true, this.orbitsVisible);
					if (sysObj.label) {
						sysObj.label.style.display = this.labelsVisible ? "" : "none";
					}
				};
				continue;
			}

			let redraw = this.staticUpdate;
			if (sysObj.objectAvailableListener) {
				redraw = true;
				sysObj.objectAvailableListener();
				sysObj.objectAvailableListener = null;
			}

			sysObj.updatePosition(this.currentDateTime);
			sysObj.updateRotation(this.currentDateTime);
			if (sysObj.orbit.line?.visible) {
				if (redraw) {
					this.universe.remove(sysObj.orbit.line);
				}
				sysObj.updateOrbitLine(this.currentDateTime, redraw);
				if (redraw && sysObj.orbit.line) {
					this.universe.add(sysObj.orbit.line);
				}
			}
		}

		if (this.lookingFrom) {
			this.updateCameraPosition();
		}
	}

	private updateCameraPosition(position?: Vector3 | null) {
		if (!this.targetObj) {
			return;
		}

		let cameraPos: Vector3;
		if (!position) {
			this.targetObj.updateMatrixWorld();
			if (this.lookingFrom && this.targetObj instanceof OrbitingObj) {
				cameraPos = this.targetObj.worldToLocal(
					this.targetObj.orbitsAround.position.clone(),
				);
			} else {
				cameraPos = new Vector3();
			}
			cameraPos.setLength(
				this.targetObj.radius * this.targetObj.getScale() * 4,
			);
			if (!this.followTarget || this.lookingFrom) {
				cameraPos = this.targetObj.localToWorld(cameraPos);
			}
		} else {
			cameraPos = position;
		}

		this.camera.position.copy(cameraPos);
	}

	private createStarField() {
		const starsGeometry = [new BufferGeometry(), new BufferGeometry()];
		const starsPositions = [
			new Float32Array(9000 * 3),
			new Float32Array(1000 * 3),
		];
		const starsColors = [
			new Float32Array(9000 * 3),
			new Float32Array(1000 * 3),
		];

		for (let i = 0; i < 10000; i++) {
			const star = new Vector3();
			star.x = (Math.random() - 0.5) * BG_SPHERE_RADIUS * 2;
			star.y = (Math.random() - 0.5) * BG_SPHERE_RADIUS * 2;
			star.z = (Math.random() - 0.5) * BG_SPHERE_RADIUS * 2;

			const index = i < 9000 ? 0 : 1;
			const offset = (index === 0 ? i : i - 9000) * 3;
			starsPositions[index][offset] = star.x;
			starsPositions[index][offset + 1] = star.y;
			starsPositions[index][offset + 2] = star.z;

			const random = Math.random();
			starsColors[index][offset] = random;
			starsColors[index][offset + 1] = random;
			starsColors[index][offset + 2] = random;
		}

		for (let i = 0; i < 2; i++) {
			starsGeometry[i].setAttribute(
				"position",
				new BufferAttribute(starsPositions[i], 3),
			);
			starsGeometry[i].setAttribute(
				"color",
				new BufferAttribute(starsColors[i], 3),
			);
		}

		const starsMaterial = [
			new PointsMaterial({
				color: 0x888888,
				sizeAttenuation: false,
				size: 1.125,
				vertexColors: true,
				blending: AdditiveBlending,
				depthWrite: false,
				transparent: true,
			}),
			new PointsMaterial({
				color: 0xaaaaaa,
				sizeAttenuation: false,
				size: 1.5,
				vertexColors: true,
				blending: AdditiveBlending,
				depthWrite: false,
				transparent: true,
			}),
		];

		this.starField1 = new Points(starsGeometry[0], starsMaterial[0]);
		this.starField2 = new Points(starsGeometry[1], starsMaterial[1]);
		this.universe.add(this.starField1);
		this.universe.add(this.starField2);
	}

	private findDefaultTarget(solarSystem: SolarSystemMap) {
		const star = Object.values(solarSystem).find((obj) => obj instanceof Star);
		if (star) {
			return star as SolarSysObj;
		}
		return Object.values(solarSystem)[0] as SolarSysObj;
	}

	updateSimulationSize() {
		const width = window.innerWidth || 0;
		const height = window.innerHeight || 0;
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(width, height);
		setViewportSize(width, height);
		for (const obj of this.orbitingObjects) {
			if (obj.orbit.line) {
				const material = obj.orbit.line.material as MeshLineMaterial;
				if (material.resolution) {
					material.resolution.set(width, height);
				}
			}
		}
		if (this.labelsVisible) {
			this.updateLabels();
		}
	}

	lookAt(object: SolarSysObj, from?: Vector3 | null, multiplier?: number) {
		this.targetObj = object;
		// 항상 카메라를 universe에 추가 (OrbitControls 호환성)
		this.universe.add(this.camera);
		const targetPosition = object.getWorldPosition(new Vector3());
		this.camera.lookAt(targetPosition);
		this.controls.target.copy(targetPosition);
		this.controls.minDistance =
			object.radius * object.getScale() * (multiplier ?? 2);
		this.updateCameraPosition(from ?? null);
	}

	setObjectsScale(objects: SolarSystemMap, scale: number) {
		for (const obj of Object.values(objects)) {
			if (obj instanceof SolarSysObj) {
				obj.setScale(scale);
			}
		}
		if (this.targetObj) {
			this.controls.minDistance = this.targetObj.radius * 2 * scale;
			this.controls.update();
		}
	}

	setObjectsVisibility(
		objects: Array<SolarSysObj | AsteroidBelt>,
		visible: boolean,
	) {
		for (const obj of objects) {
			if (obj instanceof OrbitingObj) {
				obj.setVisible(visible, this.orbitsVisible);
				if (visible) {
					obj.updatePosition(this.currentDateTime);
					obj.updateRotation(this.currentDateTime);
					if (obj.orbit.line) {
						this.universe.remove(obj.orbit.line);
					}
					obj.updateOrbitLine(this.currentDateTime, true);
					if (obj.orbit.line) {
						this.universe.add(obj.orbit.line);
					}
				}
				if (this.labelsVisible) {
					obj.updateObjLabel(this.labelRoot, this.camera);
				}
			} else {
				obj.setVisible(visible);
			}
		}
	}

	setStarsVisibility(visible: boolean) {
		if (!this.starField1 || !this.starField2) {
			return;
		}
		if (!visible) {
			this.universe.remove(this.starField1);
			this.universe.remove(this.starField2);
		} else {
			this.universe.add(this.starField1);
			this.universe.add(this.starField2);
		}
	}

	setOrbitsVisibility(objects: SolarSystemMap, visible: boolean) {
		for (const obj of Object.values(objects)) {
			if (obj instanceof OrbitingObj && obj.orbit.line && obj.visible) {
				obj.orbit.line.visible = visible;
				if (
					obj.orbit.lastDrawTime &&
					obj.orbit.lastDrawTime.getTime() !== this.currentDateTime.getTime()
				) {
					this.universe.remove(obj.orbit.line);
					obj.updateOrbitLine(this.currentDateTime, true);
					this.universe.add(obj.orbit.line);
				}
			}
		}
		this.orbitsVisible = visible;
	}

	setLabelsVisibility(objects: SolarSystemMap, visible: boolean) {
		this.labelsVisible = visible;
		for (const obj of Object.values(objects)) {
			if (obj instanceof SolarSysObj && obj.label && obj.visible) {
				obj.label.style.display = visible ? "" : "none";
			}
		}
	}

	setHabitableZoneVisibility(visible: boolean) {
		if (visible) {
			const geometry = new RingGeometry(
				0.75 * AU,
				2.4 * AU,
				SEGMENTS,
				SEGMENTS,
			);
			const material = new MeshBasicMaterial({
				color: 0x008000,
				side: DoubleSide,
				transparent: true,
				opacity: 0.25,
				depthTest: false,
			});
			this.habitableZone = new Mesh(geometry, material);
			this.habitableZone.rotateX(Math.PI / 2);
			this.universe.add(this.habitableZone);
		} else if (this.habitableZone) {
			this.universe.remove(this.habitableZone);
			this.habitableZone = null;
		}
	}

	setDebugVisibility(objects: SolarSystemMap, visible: boolean) {
		for (const obj of Object.values(objects)) {
			if (!(obj instanceof SolarSysObj) || !obj.mesh) {
				continue;
			}
			if (!obj.axesHelper) {
				obj.axesHelper = new AxesHelper(obj.radius * 4);
			}
			if (visible) {
				obj.mesh.add(obj.axesHelper);
			} else {
				obj.mesh.remove(obj.axesHelper);
			}
		}
	}

	setFollowTarget(follow: boolean) {
		this.followTarget = follow;
		if (this.targetObj && !(this.targetObj instanceof Star)) {
			this.lookAt(this.targetObj);
		}
	}

	startSimulation(startDateTime: Date | null = null) {
		if (startDateTime) {
			this.currentDateTime = startDateTime;
		}
		this.simulating = true;
	}

	stopSimulation() {
		this.simulating = false;
		if (this.clock.running) {
			this.clock.stop();
		}
	}

	setSimulationDate(dateTime: Date) {
		this.currentDateTime = dateTime;
		this.staticUpdate = true;
	}

	setSimulationSpeed(speed: number) {
		this.speedFactor = speed;
	}

	onSimulationUpdated(callback: (date: Date) => void) {
		this.onSimulationUpdatedCallback = callback;
	}

	onSimulationStop(callback: (message: string) => void) {
		this.onSimulationStopCallback = callback;
	}

	setLookFromOrbitsAround(lookFrom: boolean) {
		this.lookingFrom = lookFrom;
		this.controls.enableRotate = !lookFrom;
		if (this.targetObj) {
			this.lookAt(this.targetObj);
		}
	}
}
