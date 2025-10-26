"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

// Fragment shader for physically accurate black hole rendering
const blackholeFragmentShader = `
#define PI 3.141592653589793238462643383279
#define DEG_TO_RAD (PI/180.0)

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uCamPos;
uniform vec3 uCamDir;
uniform vec3 uCamUp;
uniform vec3 uCamVel;
uniform float uFov;
uniform bool uAccretionDisk;
uniform bool uDopplerShift;
uniform bool uLorentzTransform;

varying vec2 vUv;

// Constants
const float SCHWARZSCHILD_RADIUS = 1.0;
const float DISK_INNER_RADIUS = 1.5;
const float DISK_OUTER_RADIUS = 4.0;
const float MAX_TRACE_DISTANCE = 100.0;
const int MAX_STEPS = 256;

// Convert to spherical coordinates
vec2 toSpherical(vec3 dir) {
    float theta = acos(clamp(dir.y, -1.0, 1.0));
    float phi = atan(dir.z, dir.x);
    return vec2(theta / PI, phi / (2.0 * PI) + 0.5);
}

// Lorentz transformation for velocity
vec3 lorentzTransform(vec3 velocity, vec3 observerVel) {
    if (!uLorentzTransform || length(observerVel) < 0.001) {
        return velocity;
    }

    float beta = length(observerVel);
    float gamma = 1.0 / sqrt(1.0 - beta * beta);
    vec3 n = normalize(observerVel);

    float vDotN = dot(velocity, n);
    vec3 vParallel = vDotN * n;
    vec3 vPerp = velocity - vParallel;

    vec3 transformed = (vParallel - observerVel) / (1.0 - vDotN) + vPerp / gamma;
    return transformed;
}

// Temperature to color conversion (black body radiation)
vec3 tempToColor(float temp) {
    temp = clamp(temp, 1000.0, 40000.0);
    float t = temp / 100.0;
    vec3 color;

    // Red
    if (t <= 66.0) {
        color.r = 1.0;
    } else {
        color.r = clamp((329.698727446 * pow(t - 60.0, -0.1332047592)) / 255.0, 0.0, 1.0);
    }

    // Green
    if (t <= 66.0) {
        color.g = clamp((99.4708025861 * log(t) - 161.1195681661) / 255.0, 0.0, 1.0);
    } else {
        color.g = clamp((288.1221695283 * pow(t - 60.0, -0.0755148492)) / 255.0, 0.0, 1.0);
    }

    // Blue
    if (t >= 66.0) {
        color.b = 1.0;
    } else if (t <= 19.0) {
        color.b = 0.0;
    } else {
        color.b = clamp((138.5177312231 * log(t - 10.0) - 305.0447927307) / 255.0, 0.0, 1.0);
    }

    return color;
}

// Schwarzschild metric geodesic equation
// Returns acceleration in Schwarzschild spacetime
vec3 schwarzschildAcceleration(vec3 pos, vec3 vel) {
    float r = length(pos);
    if (r < SCHWARZSCHILD_RADIUS * 1.01) {
        return vec3(0.0); // Inside event horizon
    }

    vec3 n = pos / r;
    float rs = SCHWARZSCHILD_RADIUS;

    // Simplified geodesic equation
    float r2 = r * r;
    float r3 = r2 * r;

    // Radial and tangential components
    vec3 accel = -1.5 * rs * cross(vel, cross(vel, n)) / r2 - rs * n / (2.0 * r2);

    return accel;
}

// Leapfrog integration for geodesic tracing
bool traceGeodesic(vec3 origin, vec3 direction, out vec3 finalPos, out vec3 finalDir, out float traveled) {
    vec3 pos = origin;
    vec3 vel = normalize(direction);
    float dt = 0.05;
    traveled = 0.0;

    for (int i = 0; i < MAX_STEPS; i++) {
        float r = length(pos);

        // Check if hit event horizon
        if (r < SCHWARZSCHILD_RADIUS * 1.05) {
            return false;
        }

        // Check if escaped to infinity
        if (r > MAX_TRACE_DISTANCE) {
            finalPos = pos;
            finalDir = normalize(vel);
            return true;
        }

        // Leapfrog integration
        vec3 accel = schwarzschildAcceleration(pos, vel);
        vel += accel * dt;
        pos += vel * dt;
        traveled += length(vel * dt);
    }

    finalPos = pos;
    finalDir = normalize(vel);
    return true;
}

// Check intersection with accretion disk
bool intersectDisk(vec3 origin, vec3 direction, out vec3 hitPoint, out float diskDist) {
    // Disk is in XZ plane (y = 0)
    float t = -origin.y / direction.y;

    if (t < 0.0) return false;

    hitPoint = origin + direction * t;
    float r = length(hitPoint.xz);
    diskDist = r;

    return (r >= DISK_INNER_RADIUS && r <= DISK_OUTER_RADIUS);
}

// Accretion disk color and intensity
vec4 getDiskColor(vec3 hitPoint, float traveled) {
    float r = length(hitPoint.xz);
    vec2 diskUv = hitPoint.xz / DISK_OUTER_RADIUS;

    // Temperature gradient (hotter closer to black hole)
    float temp = mix(40000.0, 3000.0, (r - DISK_INNER_RADIUS) / (DISK_OUTER_RADIUS - DISK_INNER_RADIUS));

    // Doppler shift based on rotation
    float angle = atan(hitPoint.z, hitPoint.x);
    float dopplerFactor = 1.0;

    if (uDopplerShift) {
        // Orbital velocity (Keplerian)
        float orbitalVel = sqrt(SCHWARZSCHILD_RADIUS / (2.0 * r));
        float cosAngle = cos(angle + uTime * orbitalVel);
        dopplerFactor = 1.0 + orbitalVel * cosAngle;
        temp *= dopplerFactor;
    }

    vec3 color = tempToColor(temp);

    // Intensity falloff
    float intensity = 1.0 - smoothstep(DISK_INNER_RADIUS, DISK_OUTER_RADIUS, r);
    intensity *= 1.0 - smoothstep(0.0, DISK_INNER_RADIUS * 0.5, abs(r - DISK_INNER_RADIUS * 1.2));

    // Turbulence
    float turbulence = sin(angle * 8.0 + r * 3.0 - uTime * 2.0) * 0.5 + 0.5;
    intensity *= 0.7 + turbulence * 0.3;

    // Relativistic beaming
    float beaming = pow(dopplerFactor, 3.0);
    intensity *= beaming;

    return vec4(color * intensity, intensity * 0.9);
}

// Star background (simple noise-based)
vec3 getStarfield(vec3 direction) {
    vec2 spherical = toSpherical(direction);
    vec2 uv = spherical * 20.0;

    // Simple procedural stars
    float star = 0.0;
    float n = fract(sin(dot(floor(uv), vec2(12.9898, 78.233))) * 43758.5453);
    if (n > 0.998) {
        star = pow(n - 0.998, 2.0) * 500.0;
    }

    // Milky way gradient
    float milkyWay = smoothstep(0.3, 0.7, abs(sin(spherical.x * PI))) * 0.02;

    return vec3(star + milkyWay);
}

void main() {
    // Calculate ray direction from camera
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;

    vec3 right = normalize(cross(uCamDir, uCamUp));
    vec3 up = cross(right, uCamDir);

    float fovRad = uFov * DEG_TO_RAD;
    vec3 rayDir = normalize(uCamDir + right * uv.x * tan(fovRad / 2.0) + up * uv.y * tan(fovRad / 2.0));

    // Apply Lorentz transformation to ray direction
    if (uLorentzTransform && length(uCamVel) > 0.001) {
        rayDir = lorentzTransform(rayDir, uCamVel);
    }

    vec3 finalPos, finalDir;
    float traveled;

    vec3 color = vec3(0.0);
    bool escaped = traceGeodesic(uCamPos, rayDir, finalPos, finalDir, traveled);

    if (!escaped) {
        // Hit event horizon - pure black
        color = vec3(0.0);
    } else {
        // Check disk intersection along the geodesic path
        vec3 diskHit;
        float diskDist;

        if (uAccretionDisk && intersectDisk(uCamPos, normalize(finalPos - uCamPos), diskHit, diskDist)) {
            vec4 diskColor = getDiskColor(diskHit, traveled);
            color = diskColor.rgb;
        } else {
            // Show starfield
            color = getStarfield(finalDir);
        }
    }

    // Tone mapping
    color = color / (color + vec3(1.0));

    // Gamma correction
    color = pow(color, vec3(1.0 / 2.2));

    gl_FragColor = vec4(color, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;

void main() {
    // Fullscreen quad in clip-space (-1..1)
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const RelativisticBlackholeMaterial = shaderMaterial(
	{
		uTime: 0,
		uResolution: new THREE.Vector2(1920, 1080),
		uCamPos: new THREE.Vector3(0, 3, 8),
		uCamDir: new THREE.Vector3(0, -0.3, -1),
		uCamUp: new THREE.Vector3(0, 1, 0),
		uCamVel: new THREE.Vector3(0, 0, 0),
		uFov: 60.0,
		uAccretionDisk: true,
		uDopplerShift: true,
		uLorentzTransform: false,
	},
	vertexShader,
	blackholeFragmentShader,
);

extend({ RelativisticBlackholeMaterial });

export function RelativisticBlackhole() {
	const materialRef = useRef<any>(null);
	const { size, camera } = useThree();

	useFrame((state) => {
		if (materialRef.current) {
			materialRef.current.uTime = state.clock.getElapsedTime();
			materialRef.current.uResolution.set(size.width, size.height);

			// Update camera parameters
			materialRef.current.uCamPos.copy(camera.position);
			camera.getWorldDirection(materialRef.current.uCamDir);
			materialRef.current.uCamUp.copy(camera.up);
		}
	});

	return (
		<mesh frustumCulled={false} renderOrder={-100}>
			<planeGeometry args={[2, 2]} />
			{/* @ts-ignore */}
			<relativisticBlackholeMaterial
				ref={materialRef}
				depthTest={false}
				depthWrite={false}
				transparent={false}
			/>
		</mesh>
	);
}
