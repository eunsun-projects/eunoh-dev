export type AnimateResponse = {
	status: "success";
	mediaType: string;
	imageBase64: string;
};

export type AnimateRequest = {
	formData: FormData;
};
