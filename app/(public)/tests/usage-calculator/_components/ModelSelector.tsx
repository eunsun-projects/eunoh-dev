"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { MODELS, type Model, useUsageCalculatorStore } from "../_libs/zustand";

function ModelSelector() {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState<Model | null>(null);

	const { setModel } = useUsageCalculatorStore();

	useEffect(() => {
		if (value) {
			setModel(value);
		}
	}, [value, setModel]);

	const modelList = Object.values(MODELS).filter(
		(model) => model !== "gpt-image-1",
	);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-controls="model-selector"
					aria-expanded={open}
					aria-haspopup="listbox"
					className="w-full max-w-[500px] justify-between"
				>
					{value ? value : "인풋모델 선택, 기본 gpt-4o-mini"}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[90vw] max-w-[500px] p-0">
				<Command defaultValue={value ?? undefined}>
					{/* <CommandInput placeholder="모델 검색" className="h-9" /> */}
					<CommandList id="model-selector">
						{/* <CommandEmpty>모델 못 찾음</CommandEmpty> */}
						<CommandGroup>
							{modelList.map((model) => (
								<CommandItem
									key={model}
									value={model}
									onSelect={(currentValue: string) => {
										const selectedModel = currentValue as Model;
										setValue(selectedModel === value ? null : selectedModel);
										setOpen(false);
									}}
									className="cursor-pointer"
								>
									{model}
									<Check
										className={cn(
											"ml-auto",
											value === model ? "opacity-100" : "opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export default ModelSelector;
