import * as THREE from 'three';
import { create } from 'zustand';
import { generateColor } from './generateColor';
import { generateRandomPosition } from './generatePosition';

export interface TimeCapsule {
  userId: string;
  title: string;
  description: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  position: number[];
  color: THREE.Color;
  object: THREE.Mesh | null;
}

export interface FocusedObject {
  object: THREE.Mesh;
  instanceId?: number;
  timeCapsule?: TimeCapsule;
}

export interface TimeCapsuleState {
  focusedObject: FocusedObject | null;
  timeCapsules: TimeCapsule[];
  setFocusedObject: (focusedObject: FocusedObject | null) => void;
  setTimeCapsules: (timeCapsule: TimeCapsule) => void;
  updateTimeCapsule: (object: THREE.Mesh) => void;
}

const makeInitialTimecapSules = () => {
  return Array.from({ length: 10 }, () => ({
    userId: 'user123',
    title: 'New Capsule',
    description: 'This is a new time capsule',
    password: 'secure',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    position: [generateRandomPosition(), generateRandomPosition(), generateRandomPosition()],
    color: generateColor(),
    object: null,
  }));
};

const initialTimeCapsules = makeInitialTimecapSules();

export const useTimeCapsuleStore = create<TimeCapsuleState>((set) => ({
  focusedObject: null,
  timeCapsules: initialTimeCapsules,
  setFocusedObject: (focusedObject: FocusedObject | null) => set({ focusedObject }),
  setTimeCapsules: (timeCapsule: TimeCapsule) =>
    set((state) => ({
      timeCapsules: [...(state.timeCapsules || []), timeCapsule],
    })),
  updateTimeCapsule: (object: THREE.Mesh) =>
    set((state) => ({
      timeCapsules: state.timeCapsules.map((timeCapsule) =>
        !timeCapsule.object ? { ...timeCapsule, object } : timeCapsule,
      ),
    })),
}));
