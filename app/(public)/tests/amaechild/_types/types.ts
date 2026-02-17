import type { Tables } from "@/types/supabase";

export type Iffy = Tables<"iffy">;

export type IffyResponse = Omit<Iffy, "created_at" | "id">;

export interface LoadingState {
	open: boolean;
	isError: boolean;
}

export type AllGiftsResponse = {
	resultCount: number;
};

export type GenResponse = {
	status: "success" | "error";
	message: string;
};

export interface GiftData {
	brand: string;
	name: string;
	description: string;
	age_group: string;
	product_link: string;
	product_img: string;
}
