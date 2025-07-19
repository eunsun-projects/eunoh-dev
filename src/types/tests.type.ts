import type * as THREE from "three";
import type { Tables } from "./supabase";

export type SajuImageTestResponse = {
  error?: string;
  imageUrl?: string;
};

export type SajuMessage = {
  error?: string;
  사주해석: string;
  운세: string;
  권고사항: string;
  "번영을 위한 조언": string;
};

export type SajuTestResponse = {
  message: SajuMessage;
  imageUrl?: string;
};

export type TimeCapsuleFromSupabase = Tables<"timecapsules">;

export interface TimeCapsule extends TimeCapsuleFromSupabase {
  object: THREE.Mesh | null;
}

export interface FocusedObject {
  isIdle: boolean | null;
  timeCapsule: TimeCapsule | null;
}
