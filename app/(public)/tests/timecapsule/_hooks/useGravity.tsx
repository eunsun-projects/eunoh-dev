import { useBeforePhysicsStep, useRapier } from "@react-three/rapier";
import { Vector3 } from "three";

export const GRAVITATIONAL_CONSTANT = 6.6743e-11;
export const SCALE_FACTOR = 0.0001;

const useGravity = () => {
  const { world } = useRapier();

  useBeforePhysicsStep(() => {
    if (!world) return;

    const impulseVector = new Vector3();

    world.bodies.forEach((currentBody) => {
      if (currentBody.isSleeping()) return;

      const currentMass = currentBody.mass();
      const currentPosition = currentBody.translation();
      const currentPositionVector = new Vector3(
        currentPosition.x,
        currentPosition.y,
        currentPosition.z,
      );

      world.bodies.forEach((otherBody) => {
        if (currentBody === otherBody || otherBody.isSleeping()) return;

        const otherMass = otherBody.mass();
        const otherPosition = otherBody.translation();
        const otherPositionVector = new Vector3(
          otherPosition.x,
          otherPosition.y,
          otherPosition.z,
        );

        const distance = currentPositionVector.distanceTo(otherPositionVector);

        if (distance === 0) return;

        const force =
          (GRAVITATIONAL_CONSTANT * currentMass * otherMass) /
          // biome-ignore lint/style/useExponentiationOperator: <explanation>
          Math.pow(distance * SCALE_FACTOR, 2);
        impulseVector
          .subVectors(otherPositionVector, currentPositionVector)
          .normalize()
          .multiplyScalar(force);
        currentBody.applyImpulse(impulseVector, true);
      });
    });
  });
};

export default useGravity;
