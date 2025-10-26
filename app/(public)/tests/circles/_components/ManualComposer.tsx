"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

// three/examples
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// or: import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { VignetteShader } from "three/examples/jsm/shaders/VignetteShader.js";

export default function ManualComposer() {
	const { gl, scene, camera, size } = useThree();

	// composer를 저장할 ref
	const composerRef = useRef<EffectComposer | null>(null);

	useEffect(() => {
		if (!gl) return;
		// EffectComposer 생성
		const composer = new EffectComposer(gl);

		// 기본 RenderPass
		const renderPass = new RenderPass(scene, camera);
		composer.addPass(renderPass);

		// Bloom Pass 추가 (간단한 old Bloom)
		const bloomPass = new BloomPass(
			1.2, // strength (기본값 1.3)
			40, // kernelSize (기본값 25)
			3.0, // sigma (기본값 4)
			// 256, // resolution (기본값 256)
		);
		composer.addPass(bloomPass);

		// Vignette ShaderPass
		const vignettePass = new ShaderPass(VignetteShader);
		vignettePass.material.uniforms.darkness.value = 0.7; // 어둡기
		vignettePass.material.uniforms.offset.value = 0.2; // 얼마나 빛바램을 줄지
		composer.addPass(vignettePass);

		composerRef.current = composer;
	}, [gl, scene, camera]);

	// onResize 처리: EffectComposer 크기도 업데이트 필요
	useEffect(() => {
		if (composerRef.current) {
			composerRef.current.setSize(size.width, size.height);
		}
	}, [size]);

	// 매 프레임 postprocessing 렌더
	useFrame(() => {
		if (composerRef.current) {
			composerRef.current.render();
		}
	}, 1);
	// the second arg "1" ensures it runs after the default rendering pass
	// so it overwrites the final image

	return null;
}
