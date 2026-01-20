import {
	type BufferAttribute,
	type BufferGeometry,
	DoubleSide,
	MathUtils,
	Mesh,
	type MeshPhongMaterial,
	type PerspectiveCamera,
	Vector2,
	Vector3,
} from "three";
import { MeshLine, MeshLineMaterial } from "three.meshline";
import { AU, J2000, ORBIT_SEGMENTS, SECONDS_IN_DAY } from "../constants";
import { addDays, subDays } from "../dateUtils";
import { OrbitUtils } from "../orbitUtils";
import type { OrbitData, SolarSystemDataNode } from "../types";
import { createTextLabel, getScreenPosition, setObjectVisible } from "../utils";
import { getViewportSize } from "../viewport";
import { SolarSysObj } from "./SolarSysObj";
import { Star } from "./Star";

const Y_AXIS = new Vector3(0, 1, 0);

export class OrbitingObj extends SolarSysObj {
	orbitsAround: SolarSysObj;
	orbit: OrbitData;
	tilt: number;
	syncMap: boolean;
	rotationPeriod?: number | null;
	trueAnomaly = 0;
	objectAvailableListener: (() => void) | null = null;

	constructor(
		geometry: BufferGeometry,
		material: MeshPhongMaterial,
		data: SolarSystemDataNode,
		orbitsAround: SolarSysObj,
	) {
		super(data.name, geometry, material);
		this.orbitsAround = orbitsAround;
		this.orbit = data.orbit ?? { base: {} };

		const segmentsFactor =
			this.position.distanceTo(this.orbitsAround.position) / AU;
		this.orbit.segments = MathUtils.clamp(
			ORBIT_SEGMENTS * segmentsFactor,
			ORBIT_SEGMENTS,
			20000,
		);
		this.tilt = -(data.tilt ?? 0) * MathUtils.DEG2RAD;
		this.syncMap = data.syncMap ?? false;
		this.rotationPeriod =
			data.rotationPeriod !== undefined ? data.rotationPeriod : 0;
		this.mesh.castShadow = true;
	}

	/**
	 * 궤도 오프셋(부모로부터의 상대 위치). 위성(태양이 아닌 것 주위 공전)은
	 * getScale()에 비례해 거리를 늘려, 부모 시각 크기 확대 시에도 궤도가 부모 밖에 오도록 함.
	 */
	getOrbitalOffset(time: Date): Vector3 {
		const offset = OrbitUtils.calculateObjectPosition(time, this);
		if (!(this.orbitsAround instanceof Star)) {
			offset.multiplyScalar(this.getScale());
		}
		return offset;
	}

	updatePosition(time: Date) {
		this.position.copy(this.orbitsAround.position);
		this.position.add(this.getOrbitalOffset(time));
	}

	updateRotation(time: Date) {
		if (this.rotationPeriod === undefined || this.rotationPeriod === 0) {
			return;
		}
		if (this.rotationPeriod === null && !this.syncMap) {
			return;
		}

		if (this.syncMap) {
			this.updateMatrixWorld();
			this.orbitsAround.updateMatrixWorld();
			const orbitsAroundLocal = this.worldToLocal(
				this.orbitsAround.position.clone(),
			);
			orbitsAroundLocal.applyAxisAngle(Y_AXIS, -Math.PI / 2);
			this.mesh.lookAt(orbitsAroundLocal);
			if (this.rotationPeriod === null) {
				this.mesh.rotation.z += this.tilt;
			} else {
				const t =
					time.getUTCHours() * 3600 +
					time.getUTCMinutes() * 60 +
					time.getUTCSeconds() -
					43200;
				const p = this.rotationPeriod * SECONDS_IN_DAY;
				this.mesh.rotation.x += this.tilt;
				this.mesh.rotation.y += 2 * Math.PI * (t / p);
			}
		} else if (this.rotationPeriod !== null) {
			const rotation =
				(time.getTime() - J2000) /
				(1000 * SECONDS_IN_DAY) /
				this.rotationPeriod;
			this.mesh.rotation.x = this.tilt;
			this.mesh.rotation.y = 2 * Math.PI * rotation;
		}
	}

	updateObjLabel(container: HTMLElement, camera: PerspectiveCamera) {
		if (!this.label) {
			const labelText = this.labelText ?? this.name;
			this.label = createTextLabel(labelText, `#${this.color.getHexString()}`);
			container.appendChild(this.label);
		}
		const labelCoordinates = getScreenPosition(
			this,
			camera,
			this.radius * this.getScale(),
		);
		if (labelCoordinates) {
			labelCoordinates.y -= this.label.clientHeight;
			labelCoordinates.x -= this.label.clientWidth / 2;
			const alpha = 1 / labelCoordinates.z;
			this.label.style.transform = `translate(${labelCoordinates.x}px, ${labelCoordinates.y}px) scale(${labelCoordinates.z})`;
			this.label.style.opacity = alpha.toString();
			this.label.style.display = "";
		} else if (this.label) {
			this.label.style.display = "none";
		}
	}

	updateOrbitLine(endTime: Date, redraw = false) {
		const timeDelta =
			OrbitUtils.calculateOrbitalPeriod(endTime, this) /
			(this.orbit.segments ?? 1);
		if (!this.orbit.line || redraw) {
			const points: Vector3[] = [];
			let time = new Date(endTime.getTime());
			for (let i = 0; i < (this.orbit.segments ?? 1); ++i) {
				points.unshift(this.getOrbitalOffset(time));
				time = subDays(time, timeDelta);
			}
			const positions = new Float32Array(points.length * 3);
			points.forEach((point, index) => {
				const offset = index * 3;
				positions[offset] = point.x;
				positions[offset + 1] = point.y;
				positions[offset + 2] = point.z;
			});
			const meshLine = new MeshLine();
			meshLine.setPoints(positions, (p) => 4 * p);
			const { width, height } = getViewportSize();
			const material = new MeshLineMaterial({
				resolution: new Vector2(width, height),
				color: this.color,
				lineWidth: 1,
				sizeAttenuation: false,
				depthTest: true,
				depthWrite: true,
				opacity: 0.8,
				transparent: true,
				side: DoubleSide,
			});
			material.onBeforeCompile = (shader) => {
				if (!shader.vertexShader.includes("bool isPerspectiveMatrix")) {
					shader.vertexShader =
						"bool isPerspectiveMatrix(mat4 m){return m[2][3]==-1.0;}\n" +
						shader.vertexShader;
				}
			};
			const line = new Mesh(meshLine.geometry, material);
			line.frustumCulled = false;
			line.position.copy(this.orbitsAround.position);
			this.orbit.meshLine = meshLine;
			this.orbit.line = line;
			this.orbit.lastSegmentTime = new Date(endTime.getTime());
			this.orbit.lastDrawTime = new Date(endTime.getTime());
			return;
		}

		this.orbit.line.position.copy(this.orbitsAround.position);
		const meshLine = this.orbit.meshLine;
		if (!meshLine) {
			return;
		}

		let nextSegmentTime = addDays(this.orbit.lastSegmentTime!, timeDelta);

		if (
			this.orbit.lastDrawTime?.getTime() &&
			this.orbit.lastSegmentTime?.getTime() &&
			this.orbit.lastDrawTime.getTime() > this.orbit.lastSegmentTime.getTime()
		) {
			const time =
				endTime.getTime() <= nextSegmentTime.getTime()
					? endTime
					: nextSegmentTime;
			this.updateMeshLineTail(meshLine, this.getOrbitalOffset(time));
			if (endTime.getTime() === nextSegmentTime.getTime()) {
				nextSegmentTime = addDays(nextSegmentTime, timeDelta);
				this.orbit.lastSegmentTime = endTime;
			}
		}

		while (endTime.getTime() >= nextSegmentTime.getTime()) {
			meshLine.advance(this.getOrbitalOffset(nextSegmentTime));
			this.orbit.lastSegmentTime = nextSegmentTime;
			nextSegmentTime = addDays(nextSegmentTime, timeDelta);
			if (endTime.getTime() < nextSegmentTime.getTime()) {
				meshLine.advance(this.getOrbitalOffset(endTime));
			}
		}

		this.orbit.lastDrawTime = new Date(endTime.getTime());
	}

	private updateMeshLineTail(meshLine: MeshLine, position: Vector3) {
		const geometry = meshLine.geometry;
		const positionAttr = geometry.getAttribute("position") as
			| BufferAttribute
			| undefined;
		if (!positionAttr) {
			return;
		}
		const nextAttr = geometry.getAttribute("next") as
			| BufferAttribute
			| undefined;
		const positions = positionAttr.array as Float32Array;
		if (positions.length < 6) {
			return;
		}
		const lastIndex = positions.length - 6;
		positions[lastIndex] = position.x;
		positions[lastIndex + 1] = position.y;
		positions[lastIndex + 2] = position.z;
		positions[lastIndex + 3] = position.x;
		positions[lastIndex + 4] = position.y;
		positions[lastIndex + 5] = position.z;
		positionAttr.needsUpdate = true;

		if (nextAttr) {
			const next = nextAttr.array as Float32Array;
			if (next.length >= 6) {
				next[lastIndex] = position.x;
				next[lastIndex + 1] = position.y;
				next[lastIndex + 2] = position.z;
				next[lastIndex + 3] = position.x;
				next[lastIndex + 4] = position.y;
				next[lastIndex + 5] = position.z;
				nextAttr.needsUpdate = true;
			}
		}
	}

	setVisible(visible: boolean, displayOrbits = visible) {
		if (this.visible !== visible) {
			setObjectVisible(this, visible);
		}
		const showOrbit = visible && displayOrbits;
		if (this.orbit.line && this.orbit.line.visible !== showOrbit) {
			this.orbit.line.visible = showOrbit;
		}
	}

	isAvailable(time: Date) {
		return (
			!this.orbit.afterEpoch ||
			OrbitUtils.getJDFromUnix(time.getTime()) >= (this.orbit.epoch ?? 0)
		);
	}
}
