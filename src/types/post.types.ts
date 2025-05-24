import type { Tables } from "./supabase";

export type Post = Tables<"posts">;

export type PartialPost = Partial<Post>;
