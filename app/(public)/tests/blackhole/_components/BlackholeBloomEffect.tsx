"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

function BlackholeBloomEffect() {
	const { scene, camera, gl, size } = useThree();
	const composerRef = useRef<EffectComposer | null>(null);

	useEffect(() => {
		// EffectComposer 인스턴스 생성
		composerRef.current = new EffectComposer(gl);
		composerRef.current.setSize(size.width, size.height);

		// 씬을 그리는 RenderPass 추가
		const renderPass = new RenderPass(scene, camera);
		composerRef.current.addPass(renderPass);

		// 블랙홀에 특화된 UnrealBloomPass 설정
		const bloomPass = new UnrealBloomPass(
			new THREE.Vector2(size.width, size.height), // 해상도
			2.2, // Bloom 강도 (블랙홀의 강렬한 빛을 위해 높게)
			1.1, // Bloom 반경 (넓은 범위로 확산)
			0.05, // Bloom 임계값 (낮게 설정하여 더 많은 빛이 블룸됨)
		);
		composerRef.current.addPass(bloomPass);

		// 블랙홀에 맞는 톤 매핑 설정
		gl.toneMapping = THREE.ACESFilmicToneMapping;
		gl.toneMappingExposure = 1.5;
	}, [scene, camera, gl, size]);

	// 렌더링 루프
	useFrame(() => {
		composerRef.current?.render();
	}, 1);

	return null;
}

export default BlackholeBloomEffect;
