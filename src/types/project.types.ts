import { Tables } from "./supabase";

export type Project = Tables<"projects">;

export type PartialProject = Partial<Project>;
