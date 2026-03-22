import axios from "@/lib/axios";
import type { AnimateResponse } from "../_types/types";

export const postAnimate = async ({ formData }: { formData: FormData }) => {
	return axios.post<AnimateResponse>("/api/tests/animate", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};
