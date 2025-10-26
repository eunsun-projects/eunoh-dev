"use client";

import { Canvas } from "@react-three/fiber";
import { useTimeCapsuleStore } from "../_libs/zustand";
import TimeCapsuleScene from "./TimeCapsuleScene";

function TimeCapsuleCanvas() {
	const { setFocusedObject } = useTimeCapsuleStore();

	const handlePointerMissed = () => {
		console.log("pointer missed");
		setFocusedObject({ isIdle: true, timeCapsule: null });
	};

	return (
		<Canvas
			color="black"
			onPointerMissed={handlePointerMissed}
			camera={{ position: [0, 6, 5], fov: 75 }}
		>
			<TimeCapsuleScene />
		</Canvas>
	);
}

export default TimeCapsuleCanvas;
