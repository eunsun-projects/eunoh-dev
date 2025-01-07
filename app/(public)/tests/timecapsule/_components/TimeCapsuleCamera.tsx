'use client';

import { CameraControls } from '@react-three/drei';

function TimeCapsuleCamera() {
  return <CameraControls makeDefault maxDistance={50} />;
}

export default TimeCapsuleCamera;
