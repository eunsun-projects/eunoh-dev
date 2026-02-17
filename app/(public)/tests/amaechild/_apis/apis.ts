import axios from "@/lib/axios";
import type { AllGiftsResponse, Iffy } from "../_types/types";

export const getAllIffies = async () => {
	return axios.get<AllGiftsResponse>("/api/iffy");
};

export const getIffy = async ({ id }: { id: string }) => {
	return axios.get<Iffy>(`/api/iffy?id=${id}`);
};

export const postIffy = async ({ formData }: { formData: FormData }) => {
	return axios.post<Iffy>("/api/iffy", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};
