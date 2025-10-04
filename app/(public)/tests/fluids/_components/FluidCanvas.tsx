"use client";

import { useEffect, useRef } from "react";

type FloatArray = Float32Array;

export default function FluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const gridRef = useRef<{
    cols: number;
    rows: number;
    u: FloatArray;
    v: FloatArray;
    u0: FloatArray;
    v0: FloatArray;
    d: FloatArray;
    d0: FloatArray;
    p: FloatArray;
    div: FloatArray;
    solid: Uint8Array;
    h: number;
  } | null>(null);

  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = document.createElement("canvas");
    offscreenRef.current = canvas;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = canvas as HTMLCanvasElement;
    const gctx = ctx as CanvasRenderingContext2D;
    const ADVECT_SPEED_MULT = 1.4;
    const FLOW_INLET_SPEED = 2.6;

    function idx(i: number, j: number, cols: number) {
      return i + j * cols;
    }

    function createField(cols: number, rows: number) {
      const N = cols * rows;
      return {
        u: new Float32Array(N),
        v: new Float32Array(N),
        u0: new Float32Array(N),
        v0: new Float32Array(N),
        d: new Float32Array(N),
        d0: new Float32Array(N),
        p: new Float32Array(N),
        div: new Float32Array(N),
        solid: new Uint8Array(N),
      };
    }

    function setupGrid() {
      const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
      const W = Math.max(320, Math.floor(window.innerWidth));
      const H = Math.max(320, Math.floor(window.innerHeight));
      c.width = Math.floor(W * dpr);
      c.height = Math.floor(H * dpr);
      c.style.width = `${W}px`;
      c.style.height = `${H}px`;
      gctx.setTransform(1, 0, 0, 1, 0, 0);
      gctx.scale(dpr, dpr);

      // 그리드 해상도 결정 (성능/품질 트레이드오프)
      const targetCell = Math.max(
        4,
        Math.min(10, Math.floor(Math.min(W, H) / 80)),
      );
      const cols = Math.max(64, Math.floor(W / targetCell));
      const rows = Math.max(36, Math.floor(H / targetCell));
      const h = 1; // 셀 간격 (정규화)

      const f = createField(cols, rows);

      // 원형 장애물 마스크 구성
      const cx = Math.floor(cols * 0.5);
      const cy = Math.floor(rows * 0.5);
      const r = Math.floor(Math.min(cols, rows) * 0.13);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = idx(i, j, cols);
          const dx = i - cx;
          const dy = j - cy;
          f.solid[k] = dx * dx + dy * dy <= r * r ? 1 : 0;
        }
      }

      gridRef.current = { cols, rows, h, ...f };
      sizeRef.current = { w: W, h: H };

      // 오프스크린 캔버스는 그리드 크기에 맞춤
      if (offscreenRef.current) {
        offscreenRef.current.width = cols;
        offscreenRef.current.height = rows;
      }
    }

    function clamp(x: number, a: number, b: number) {
      return Math.max(a, Math.min(b, x));
    }

    function bilerp(
      a: FloatArray,
      x: number,
      y: number,
      cols: number,
      rows: number,
    ) {
      const px = clamp(x, 0.5, cols - 1.5);
      const py = clamp(y, 0.5, rows - 1.5);
      const i0 = Math.floor(px);
      const j0 = Math.floor(py);
      const i1 = i0 + 1;
      const j1 = j0 + 1;
      const sx = px - i0;
      const sy = py - j0;
      const k00 = idx(i0, j0, cols);
      const k10 = idx(i1, j0, cols);
      const k01 = idx(i0, j1, cols);
      const k11 = idx(i1, j1, cols);
      const v0 = a[k00] * (1 - sx) + a[k10] * sx;
      const v1 = a[k01] * (1 - sx) + a[k11] * sx;
      return v0 * (1 - sy) + v1 * sy;
    }

    function addInflow() {
      const g = gridRef.current;
      if (!g) return;
      const { cols, rows, u, v, d } = g;
      const mid = Math.floor(rows * 0.5);
      const radius = Math.max(2, Math.floor(rows * 0.06));
      for (let j = mid - radius; j <= mid + radius; j++) {
        for (let i = 1; i <= 3; i++) {
          if (j < 1 || j >= rows - 1) continue;
          const k = idx(i, j, cols);
          d[k] = 1.0;
          u[k] = FLOW_INLET_SPEED; // 오른쪽으로 유입 속도 (가속)
          v[k] = 0.0;
        }
      }
    }

    function applyBoundary() {
      const g = gridRef.current;
      if (!g) return;
      const { cols, rows, u, v, solid } = g;
      // 도메인 경계: 노멀 속도 0
      for (let i = 0; i < cols; i++) {
        u[idx(i, 0, cols)] = 0;
        u[idx(i, rows - 1, cols)] = 0;
        v[idx(i, 0, cols)] = 0;
        v[idx(i, rows - 1, cols)] = 0;
      }
      for (let j = 0; j < rows; j++) {
        u[idx(0, j, cols)] = 0;
        u[idx(cols - 1, j, cols)] = 0;
        v[idx(0, j, cols)] = 0;
        v[idx(cols - 1, j, cols)] = 0;
      }
      // 장애물 내부: 속도 0
      for (let j = 1; j < rows - 1; j++) {
        for (let i = 1; i < cols - 1; i++) {
          const k = idx(i, j, cols);
          if (solid[k]) {
            u[k] = 0;
            v[k] = 0;
          }
        }
      }
    }

    function advectVelocity(dt: number) {
      const g = gridRef.current;
      if (!g) return;
      const { cols, rows, u, v, u0, v0 } = g;
      u0.set(u);
      v0.set(v);
      for (let j = 1; j < rows - 1; j++) {
        for (let i = 1; i < cols - 1; i++) {
          const k = idx(i, j, cols);
          const x = i - dt * u0[k] * ADVECT_SPEED_MULT;
          const y = j - dt * v0[k] * ADVECT_SPEED_MULT;
          u[k] = bilerp(u0, x, y, cols, rows);
          v[k] = bilerp(v0, x, y, cols, rows);
        }
      }
    }

    function project(iterations = 20) {
      const g = gridRef.current;
      if (!g) return;
      const { cols, rows, u, v, p, div, solid } = g;
      const h = 1.0;
      // 발산 계산
      for (let j = 1; j < rows - 1; j++) {
        for (let i = 1; i < cols - 1; i++) {
          const k = idx(i, j, cols);
          const du =
            ((u[idx(i + 1, j, cols)] - u[idx(i - 1, j, cols)]) * 0.5) / h;
          const dv =
            ((v[idx(i, j + 1, cols)] - v[idx(i, j - 1, cols)]) * 0.5) / h;
          div[k] = du + dv;
          p[k] = 0;
        }
      }
      // 장애물 내부는 발산 0, 압력 0 초기화
      for (let j = 1; j < rows - 1; j++) {
        for (let i = 1; i < cols - 1; i++) {
          const k = idx(i, j, cols);
          if (solid[k]) {
            div[k] = 0;
            p[k] = 0;
          }
        }
      }
      // 포아송 방정식 Jacobi 반복
      for (let it = 0; it < iterations; it++) {
        for (let j = 1; j < rows - 1; j++) {
          for (let i = 1; i < cols - 1; i++) {
            const k = idx(i, j, cols);
            if (solid[k]) continue;
            p[k] =
              (p[idx(i - 1, j, cols)] +
                p[idx(i + 1, j, cols)] +
                p[idx(i, j - 1, cols)] +
                p[idx(i, j + 1, cols)] -
                div[k]) *
              0.25;
          }
        }
      }
      // 그라디언트 제거 (속도 보정)
      for (let j = 1; j < rows - 1; j++) {
        for (let i = 1; i < cols - 1; i++) {
          const k = idx(i, j, cols);
          if (solid[k]) continue;
          u[k] -= ((p[idx(i + 1, j, cols)] - p[idx(i - 1, j, cols)]) * 0.5) / h;
          v[k] -= ((p[idx(i, j + 1, cols)] - p[idx(i, j - 1, cols)]) * 0.5) / h;
        }
      }
      // 경계 및 장애물 적용
      applyBoundary();
    }

    function advectDensity(dt: number) {
      const g = gridRef.current;
      if (!g) return;
      const { cols, rows, d, d0, u, v, solid } = g;
      d0.set(d);
      for (let j = 1; j < rows - 1; j++) {
        for (let i = 1; i < cols - 1; i++) {
          const k = idx(i, j, cols);
          const x = i - dt * u[k] * ADVECT_SPEED_MULT;
          const y = j - dt * v[k] * ADVECT_SPEED_MULT;
          d[k] = bilerp(d0, x, y, cols, rows);
          if (solid[k]) d[k] = 0;
        }
      }
      // 가장자리에서 밀도 약간 감쇠 (연기 누출 방지)
      for (let i = 0; i < cols; i++) {
        d[idx(i, 0, cols)] *= 0.9;
        d[idx(i, rows - 1, cols)] *= 0.9;
      }
      for (let j = 0; j < rows; j++) {
        d[idx(0, j, cols)] *= 0.9;
        d[idx(cols - 1, j, cols)] *= 0.9;
      }
    }

    function render() {
      const g = gridRef.current;
      if (!g || !offscreenRef.current) return;
      const { cols, rows, d, solid } = g;
      const osc = offscreenRef.current;
      const octx = osc.getContext("2d");
      if (!octx) return;
      const img = octx.createImageData(cols, rows);
      const data = img.data;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = idx(i, j, cols);
          const di = Math.max(0, Math.min(1, d[k]));
          const base = (i + j * cols) * 4;
          const val = Math.floor(di * 255);
          data[base + 0] = val;
          data[base + 1] = val;
          data[base + 2] = val;
          data[base + 3] = solid[k] ? 255 : 255; // 불투명
        }
      }
      octx.putImageData(img, 0, 0);
      gctx.imageSmoothingEnabled = true;
      gctx.clearRect(0, 0, sizeRef.current.w, sizeRef.current.h);
      gctx.drawImage(osc, 0, 0, sizeRef.current.w, sizeRef.current.h);

      // 장애물 가시화 (회색 채움 + 연한 외곽선)
      gctx.fillStyle = "#777";
      gctx.strokeStyle = "rgba(255,255,255,0.25)";
      const r = Math.min(sizeRef.current.w, sizeRef.current.h) * 0.13;
      gctx.beginPath();
      gctx.arc(
        sizeRef.current.w * 0.5,
        sizeRef.current.h * 0.5,
        r,
        0,
        Math.PI * 2,
      );
      gctx.fill();
      gctx.stroke();
    }

    function step(dt: number) {
      addInflow();
      advectVelocity(dt);
      applyBoundary();
      project(22);
      advectDensity(dt);
    }

    function animate() {
      const dt = 1 / 60;
      step(dt);
      render();
      rafRef.current = requestAnimationFrame(animate);
    }

    function onResize() {
      setupGrid();
    }

    setupGrid();
    window.addEventListener("resize", onResize);
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
