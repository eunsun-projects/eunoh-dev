import { Tables } from "./supabase";

export type Project = Tables<"projects">;

export type ProjectWithImages = Project & { newImages: ProjectImage[] };

export type ProjectImage = {
    image: string;
    width: number;
    height: number;
};

export type PartialProject = Partial<Project>;
