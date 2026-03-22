import { useMutation } from "@tanstack/react-query";
import { postAnimate } from "../_apis/apis";
import type { AnimateRequest, AnimateResponse } from "../_types/types";

export const useAnimateMutation = () => {
	return useMutation<AnimateResponse, Error, AnimateRequest>({
		mutationFn: ({ formData }: AnimateRequest) => postAnimate({ formData }),
	});
};
