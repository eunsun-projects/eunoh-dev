import { Sphere, Stars } from '@react-three/drei';
import BloomEffect from './BloomEffect';
import RotatingSpheres from './RotatingSpheres';
import TimeCapsuleCamera from './TimeCapsuleCamera';

function TimeCapsuleScene() {
  // useGravity();

  return (
    <>
      <ambientLight intensity={0.01} />
      <Sphere scale={0.05} position={[0, 0, 0]}>
        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
        <pointLight position={[0, 0, 0]} intensity={50000} color="white" power={10000} />
      </Sphere>
      <RotatingSpheres count={10} />
      <Stars count={2500} depth={20} radius={3.5} saturation={1} factor={0.3} speed={3} />
      <BloomEffect />
      <TimeCapsuleCamera />
    </>
  );
}

export default TimeCapsuleScene;
