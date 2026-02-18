import axios from "@/lib/axios";
import type { AllGiftsResponse, Iffy } from "../_types/types";

export const getAllIffies = async () => {
	return axios.get<AllGiftsResponse>("/api/tests/iffy");
};

export const getIffy = async ({ id }: { id: string }) => {
	return axios.get<Iffy>(`/api/tests/iffy?id=${id}`);
};

export const postIffy = async ({ formData }: { formData: FormData }) => {
	return axios.post<Iffy>("/api/tests/iffy", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};
