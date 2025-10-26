import { MODELS } from "../_libs/zustand";

// per 1M tokens
const pricing = {
	txt_model: [
		{
			model: MODELS.GPT_4O,
			input_base: 2.5,
			output_base: 10,
			input_per_token: 0.0000025,
			output_per_token: 0.00001,
		},
		{
			model: MODELS.GPT_4O_MINI,
			input_base: 0.15,
			output_base: 0.6,
			input_per_token: 0.00000015,
			output_per_token: 0.0000006,
		},
		{
			model: "gpt-image-1",
			input_base: 5,
			output_base: 0,
			input_per_token: 0.000005,
			output_per_token: 0,
		},
	],
	image_model: [
		{
			model: "gpt-image-1",
			input_base: 10,
			output_base: 40,
			input_per_token: 0.00001,
			output_per_token: 0.00004,
		},
	],
};

export default pricing;
