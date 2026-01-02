"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { type FourplayModelId, MODEL_LIST } from "../_libs/fourplay-models";

interface ModelSelectProps {
	value: FourplayModelId | null;
	onChange: (value: FourplayModelId) => void;
	disabled?: boolean;
	placeholder?: string;
}

export default function ModelSelect({
	value,
	onChange,
	disabled,
	placeholder = "Select a model",
}: ModelSelectProps) {
	return (
		<Select
			value={value || undefined}
			onValueChange={(v) => onChange(v as FourplayModelId)}
			disabled={disabled}
		>
			<SelectTrigger className="w-[200px]">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{MODEL_LIST.map((model) => (
					<SelectItem key={model.id} value={model.id}>
						<div className="flex flex-col">
							<span>{model.label}</span>
							<span className="text-muted-foreground text-xs">
								{model.description}
							</span>
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
