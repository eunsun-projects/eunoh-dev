import { MathUtils, Vector3 } from "three";
import { AU, J2000, SECONDS_IN_CENTURY, SECONDS_IN_DAY } from "./constants";
import type { OrbitingObj } from "./objects/OrbitingObj";

const CIRCLE_RAD = 2 * Math.PI;
const YEAR = 365.25636;
const TOL = 10e-6;

function solveKeplerEquation(e: number, M: number) {
	let prevE = 0;
	let currentE = M;
	do {
		prevE = currentE;
		currentE =
			prevE + (M - prevE + e * Math.sin(prevE)) / (1 - e * Math.cos(prevE));
	} while (Math.abs(currentE - prevE) > TOL);
	return currentE;
}

function calculateEccentricAnomaly(e: number, M: number) {
	if (e === 0.0 || e === 1.0) {
		return M;
	}
	if (e < 1.0) {
		return solveKeplerEquation(e, M);
	}
	return M;
}

export const OrbitUtils = {
	getJDFromUnix(unixMSecs: number) {
		return unixMSecs / 86400000.0 + 2440587.5;
	},
	calculateOrbitalPeriod(time: Date, object: OrbitingObj) {
		if (object.orbit.day) {
			return 360 / object.orbit.day.M;
		}
		const T = (time.getTime() - J2000) / SECONDS_IN_CENTURY;
		const orbitRadius = object.orbit.base.a + (object.orbit.cy?.a ?? 0) * T;
		return Math.sqrt(orbitRadius * orbitRadius * orbitRadius) * YEAR;
	},
	calculateObjectPosition(time: Date, object: OrbitingObj) {
		let T = Math.floor((time.getTime() - J2000) / 1000);

		if (object.orbit.epoch) {
			T -= (object.orbit.epoch - 2451545.0) * SECONDS_IN_DAY;
		}

		const cy = Object.hasOwn(object.orbit, "cy");
		const base = object.orbit.base;
		const correction = cy ? object.orbit.cy! : object.orbit.day!;

		if (cy) {
			T /= SECONDS_IN_CENTURY;
		} else {
			T /= SECONDS_IN_DAY;
		}

		const elements: Record<string, number> = {};
		for (const element of Object.keys(base)) {
			elements[element] = base[element] + correction[element] * T;
		}

		elements.a *= AU;
		if (cy) {
			elements.w = elements.lp - elements.O;
			elements.M = elements.L - elements.lp;
		}

		elements.w *= MathUtils.DEG2RAD;
		elements.M *= MathUtils.DEG2RAD;
		elements.I *= MathUtils.DEG2RAD;
		elements.O *= MathUtils.DEG2RAD;

		elements.E = calculateEccentricAnomaly(elements.e, elements.M);

		elements.E %= CIRCLE_RAD;
		elements.I %= CIRCLE_RAD;
		elements.O %= CIRCLE_RAD;
		elements.w %= CIRCLE_RAD;

		const xv = elements.a * (Math.cos(elements.E) - elements.e);
		const yv =
			elements.a *
			Math.sqrt(1.0 - elements.e * elements.e) *
			Math.sin(elements.E);

		object.trueAnomaly =
			2 *
			Math.atan(
				Math.sqrt((1.0 + elements.e) / (1.0 - elements.e)) *
					Math.tan(elements.E / 2),
			);

		const x_ecl =
			(Math.cos(elements.w) * Math.cos(elements.O) -
				Math.sin(elements.w) * Math.sin(elements.O) * Math.cos(elements.I)) *
				xv +
			(-Math.sin(elements.w) * Math.cos(elements.O) -
				Math.cos(elements.w) * Math.sin(elements.O) * Math.cos(elements.I)) *
				yv;
		const y_ecl =
			(Math.cos(elements.w) * Math.sin(elements.O) +
				Math.sin(elements.w) * Math.cos(elements.O) * Math.cos(elements.I)) *
				xv +
			(-Math.sin(elements.w) * Math.sin(elements.O) +
				Math.cos(elements.w) * Math.cos(elements.O) * Math.cos(elements.I)) *
				yv;
		const z_ecl =
			Math.sin(elements.w) * Math.sin(elements.I) * xv +
			Math.cos(elements.w) * Math.sin(elements.I) * yv;

		return new Vector3(x_ecl, z_ecl, -y_ecl);
	},
};
