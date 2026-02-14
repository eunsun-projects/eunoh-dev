"use client";

import { useEffect, useRef, useState } from "react";

import styles from "../_styles/blackhole-retry.module.css";
import type { BlackholeParams } from "./Controls";

const shaderCode = `
struct Uniforms {
  resolution: vec2f,
  time: f32,
  mass: f32,
  intensity: f32,
  temperature: f32,
  maxSteps: f32,
  fbmOctaves: f32,
  camPos: vec3f,
  camTarget: vec3f,
};

@group(0) @binding(0) var<uniform> u: Uniforms;

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

@vertex
fn vs_main(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  var pos = array<vec2f, 6>(
    vec2f(-1.0, -1.0), vec2f(1.0, -1.0), vec2f(-1.0, 1.0),
    vec2f(-1.0, 1.0), vec2f(1.0, -1.0), vec2f(1.0, 1.0)
  );
  var output: VertexOutput;
  output.position = vec4f(pos[vertexIndex], 0.0, 1.0);
  output.uv = pos[vertexIndex];
  return output;
}

fn hash(p: vec2f) -> f32 {
  var p3 = fract(vec3f(p.xyx) * .1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

fn noise(p: vec2f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let uu = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2f(0.0, 0.0)), hash(i + vec2f(1.0, 0.0)), uu.x),
    mix(hash(i + vec2f(0.0, 1.0)), hash(i + vec2f(1.0, 1.0)), uu.x),
    uu.y
  );
}

fn fbm(p: vec2f) -> f32 {
  let octaves = i32(u.fbmOctaves);
  var value: f32 = 0.0;
  var amplitude: f32 = 0.5;
  var st = p;
  for (var i = 0; i < 5; i++) {
    if (i >= octaves) {
      break;
    }
    value += amplitude * noise(st);
    st *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

fn blackBodyColor(t: f32) -> vec3f {
  let r = smoothstep(0.0, 0.5, t) + smoothstep(0.3, 1.0, t);
  let g = smoothstep(0.2, 0.7, t) + smoothstep(0.8, 1.0, t) * 0.5;
  let b = smoothstep(0.5, 0.9, t) + smoothstep(0.9, 1.0, t) * 2.0;
  return vec3f(r, g, b) * u.intensity;
}

@fragment
fn fs_main(in: VertexOutput) -> @location(0) vec4f {
  let uv = in.uv * vec2f(u.resolution.x / u.resolution.y, 1.0);

  let ro = u.camPos;
  let ta = u.camTarget;

  let ww = normalize(ta - ro);
  let uu = normalize(cross(ww, vec3f(0.0, 1.0, 0.0)));
  let vv = normalize(cross(uu, ww));

  var rd = normalize(uv.x * uu + uv.y * vv + 1.5 * ww);

  var pos = ro;
  var color = vec3f(0.0);
  var glow = 0.0;

  let dt = 0.05;
  let maxSteps = i32(u.maxSteps);

  let innerRadius = 2.0 * u.mass;
  let diskInner = 2.6 * u.mass;
  let diskOuter = 8.0 * u.mass;

  var hitHorizon = false;

  for (var i = 0; i < 300; i++) {
    if (i >= maxSteps) {
      break;
    }
    let distSq = dot(pos, pos);
    let dist = sqrt(distSq);

    if (dist < innerRadius) {
      hitHorizon = true;
      break;
    }

    if (dist > 25.0) {
      break;
    }

    let force = (1.5 * u.mass) / (distSq * 1.5);
    let acc = -normalize(pos) * force;

    rd += acc * dt;
    rd = normalize(rd);

    let prevPos = pos;
    pos += rd * dt;

    if (prevPos.y * pos.y < 0.0 || abs(pos.y) < 0.1) {
      let midPoint = (prevPos + pos) * 0.5;
      let r = length(midPoint.xz);

      if (r > diskInner && r < diskOuter) {
        let angle = atan2(midPoint.z, midPoint.x);

        let uvDisk = vec2f(r - diskInner, angle + u.time * 0.5 + 10.0 / r);

        var density = fbm(uvDisk * vec2f(1.0, 3.0));

        let fade = smoothstep(diskOuter, diskOuter - 1.0, r) *
          smoothstep(diskInner, diskInner + 0.5, r);
        density *= fade;

        let velDir = normalize(vec3f(-midPoint.z, 0.0, midPoint.x));
        let viewDir = normalize(ro - midPoint);
        let doppler = 1.0 + dot(velDir, viewDir) * 0.5;

        let temp = density * doppler;
        let diskCol = blackBodyColor(temp * (0.5 + u.temperature));

        color += diskCol * density * 0.4 * u.intensity;
      }
    }

    glow += 0.01 / (dist * dist * 0.1 + 0.01);
  }

  if (!hitHorizon) {
    let starDir = rd;
    let starVal = pow(hash(starDir.xy * 50.0 + starDir.zz * 50.0), 50.0) * 2.0;
    color += vec3f(starVal);
  }

  color += vec3f(0.1, 0.3, 0.5) * glow * 0.5;

  color = color / (color + vec3f(1.0));
  color = pow(color, vec3f(0.4545));

  return vec4f(color, 1.0);
}
`;

type Status =
	| { kind: "loading" }
	| { kind: "ready" }
	| { kind: "error"; title: string; message: string };

type Props = {
	params: BlackholeParams;
};

function BlackholeRetryCanvas({ params }: Props) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const wrapRef = useRef<HTMLDivElement | null>(null);

	const paramsRef = useRef<BlackholeParams>(params);
	paramsRef.current = params;

	const rafRef = useRef<number | null>(null);
	const [status, setStatus] = useState<Status>({ kind: "loading" });

	useEffect(() => {
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		if (!canvas || !wrap) return;

		let destroyed = false;
		let ro: ResizeObserver | null = null;
		let lastW = 0;
		let lastH = 0;

		const state = {
			time: 0,
			camRadius: 8.0,
			camTheta: 0.0,
			camPhi: 0.3,
			mouseDown: false,
			lastMouseX: 0,
			lastMouseY: 0,
		};

		const onMouseDown = (e: MouseEvent) => {
			state.mouseDown = true;
			state.lastMouseX = e.clientX;
			state.lastMouseY = e.clientY;
		};
		const onMouseUp = () => {
			state.mouseDown = false;
		};
		const onMouseMove = (e: MouseEvent) => {
			if (!state.mouseDown) return;
			const dx = e.clientX - state.lastMouseX;
			const dy = e.clientY - state.lastMouseY;
			state.lastMouseX = e.clientX;
			state.lastMouseY = e.clientY;

			state.camTheta -= dx * 0.005;
			state.camPhi += dy * 0.005;
			state.camPhi = Math.max(-1.5, Math.min(1.5, state.camPhi));
		};
		const onWheel = (e: WheelEvent) => {
			state.camRadius += e.deltaY * 0.01;
			state.camRadius = Math.max(3.0, Math.min(20.0, state.camRadius));
		};

		canvas.addEventListener("mousedown", onMouseDown);
		window.addEventListener("mouseup", onMouseUp);
		window.addEventListener("mousemove", onMouseMove);
		canvas.addEventListener("wheel", onWheel, { passive: true });

		const applyCanvasSize = () => {
			const nextW = Math.max(1, Math.floor(wrap.clientWidth));
			const nextH = Math.max(1, Math.floor(wrap.clientHeight));

			if (nextW === lastW && nextH === lastH) return;
			lastW = nextW;
			lastH = nextH;

			const dpr = Math.min(2, window.devicePixelRatio || 1);
			canvas.width = Math.floor(nextW * dpr);
			canvas.height = Math.floor(nextH * dpr);
		};

		ro = new ResizeObserver(() => applyCanvasSize());
		ro.observe(wrap);
		applyCanvasSize();

		const cleanup = () => {
			canvas.removeEventListener("mousedown", onMouseDown);
			window.removeEventListener("mouseup", onMouseUp);
			window.removeEventListener("mousemove", onMouseMove);
			canvas.removeEventListener("wheel", onWheel);
			ro?.disconnect();

			if (rafRef.current != null) {
				cancelAnimationFrame(rafRef.current);
				rafRef.current = null;
			}
		};

		const isProbablyMobile =
			window.matchMedia("(pointer: coarse)").matches ||
			Math.min(window.innerWidth, window.innerHeight) < 768;

		// Keep resolution (DPR) for mobile, but reduce shader detail.
		const quality = isProbablyMobile
			? { maxSteps: 140, fbmOctaves: 3, fpsCap: 30 }
			: { maxSteps: 300, fbmOctaves: 5, fpsCap: 0 };

		const run = async () => {
			if (!navigator.gpu) {
				setStatus({
					kind: "error",
					title: "WebGPU 지원 불가",
					message:
						"이 브라우저는 WebGPU를 지원하지 않습니다. Chrome 최신 버전이나 Edge를 사용해 주세요.",
				});
				return;
			}

			try {
				const adapter = await navigator.gpu.requestAdapter();
				if (!adapter) throw new Error("No GPU adapter found");
				const device = await adapter.requestDevice();
				const context = canvas.getContext("webgpu");
				if (!context) throw new Error("Failed to get WebGPU context");

				const format = navigator.gpu.getPreferredCanvasFormat();
				context.configure({
					device,
					format,
					alphaMode: "opaque",
				});

				const shaderModule = device.createShaderModule({
					label: "BlackholeRetryShader",
					code: shaderCode,
				});

				const pipeline = device.createRenderPipeline({
					label: "BlackholeRetryPipeline",
					layout: "auto",
					vertex: {
						module: shaderModule,
						entryPoint: "vs_main",
					},
					fragment: {
						module: shaderModule,
						entryPoint: "fs_main",
						targets: [{ format }],
					},
					primitive: { topology: "triangle-list" },
				});

				// 64 bytes (16 floats) — matches shader uniform layout (see HF comment).
				const uniformBufferSize = 64;
				const uniformBuffer = device.createBuffer({
					size: uniformBufferSize,
					usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
				});

				const bindGroup = device.createBindGroup({
					layout: pipeline.getBindGroupLayout(0),
					entries: [
						{
							binding: 0,
							resource: { buffer: uniformBuffer },
						},
					],
				});

				const uniformValues = new Float32Array(uniformBufferSize / 4);

				if (!destroyed) setStatus({ kind: "ready" });

				let lastRenderMs: number | null = null;

				const render = (nowMs: number) => {
					if (destroyed) return;

					if (quality.fpsCap > 0 && lastRenderMs != null) {
						const minDeltaMs = 1000 / quality.fpsCap;
						if (nowMs - lastRenderMs < minDeltaMs) {
							rafRef.current = requestAnimationFrame(render);
							return;
						}
					}

					const deltaMs = lastRenderMs == null ? 16.67 : nowMs - lastRenderMs;
					lastRenderMs = nowMs;

					applyCanvasSize();

					const p = paramsRef.current;
					// Keep animation speed consistent even when capped to 30fps.
					state.time += (deltaMs / 1000) * 0.6 * p.speed;

					const width = canvas.width;
					const height = canvas.height;

					const camX =
						state.camRadius * Math.sin(state.camTheta) * Math.cos(state.camPhi);
					const camY = state.camRadius * Math.sin(state.camPhi);
					const camZ =
						state.camRadius * Math.cos(state.camTheta) * Math.cos(state.camPhi);

					uniformValues[0] = width;
					uniformValues[1] = height;
					uniformValues[2] = state.time;
					uniformValues[3] = p.mass;

					uniformValues[4] = p.intensity;
					uniformValues[5] = p.temperature;
					uniformValues[6] = quality.maxSteps;
					uniformValues[7] = quality.fbmOctaves;

					uniformValues[8] = camX;
					uniformValues[9] = camY;
					uniformValues[10] = camZ;
					uniformValues[11] = 0;

					uniformValues[12] = 0;
					uniformValues[13] = 0;
					uniformValues[14] = 0;
					uniformValues[15] = 0;

					device.queue.writeBuffer(uniformBuffer, 0, uniformValues);

					const commandEncoder = device.createCommandEncoder();
					const textureView = context.getCurrentTexture().createView();

					const pass = commandEncoder.beginRenderPass({
						colorAttachments: [
							{
								view: textureView,
								clearValue: { r: 0, g: 0, b: 0, a: 1 },
								loadOp: "clear",
								storeOp: "store",
							},
						],
					});

					pass.setPipeline(pipeline);
					pass.setBindGroup(0, bindGroup);
					pass.draw(6);
					pass.end();

					device.queue.submit([commandEncoder.finish()]);

					rafRef.current = requestAnimationFrame(render);
				};

				rafRef.current = requestAnimationFrame(render);
			} catch (e) {
				const message = e instanceof Error ? e.message : String(e);
				setStatus({ kind: "error", title: "오류 발생", message });
				console.error(e);
			}
		};

		void run();

		return () => {
			destroyed = true;
			cleanup();
		};
	}, []);

	return (
		<div ref={wrapRef} className={styles.canvasWrap}>
			{status.kind === "loading" ? (
				<div className={styles.loader} role="status" aria-label="Loading" />
			) : null}

			{status.kind === "error" ? (
				<div className={`${styles.status} ${styles.statusError}`}>
					<h3>{status.title}</h3>
					<p>{status.message}</p>
				</div>
			) : null}

			<canvas ref={canvasRef} className={styles.canvas} />
		</div>
	);
}

export default BlackholeRetryCanvas;
