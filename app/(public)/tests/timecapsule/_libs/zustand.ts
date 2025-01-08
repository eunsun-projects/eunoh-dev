import * as THREE from 'three';
import { create } from 'zustand';

export interface FocusedObject {
  object: THREE.Mesh;
  instanceId?: number;
}

export interface TimeCapsuleState {
  focusedObject: FocusedObject | null;
  setFocusedObject: (focusedObject: FocusedObject | null) => void;
}

export const useTimeCapsuleStore = create<TimeCapsuleState>((set) => ({
  focusedObject: null,
  setFocusedObject: (focusedObject: FocusedObject | null) => set({ focusedObject }),
}));
