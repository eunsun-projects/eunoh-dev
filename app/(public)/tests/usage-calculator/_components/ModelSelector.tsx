"use client";

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
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import {
  MODELS_WITHOUT_IMAGE,
  type ModelWithoutImage,
  useUsageCalculatorStore,
} from "../_libs/zustand";

function ModelSelector() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<ModelWithoutImage | null>(null);

  const { setModel } = useUsageCalculatorStore();

  useEffect(() => {
    if (value) {
      setModel(value);
    }
  }, [value, setModel]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          role="combobox"
          aria-controls="model-selector"
          aria-expanded={open}
          aria-haspopup="listbox"
          className="w-[500px] justify-between"
        >
          {value ? value : "모델 선택, 기본 gpt-4o-mini"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command defaultValue={value ?? undefined}>
          {/* <CommandInput placeholder="모델 검색" className="h-9" /> */}
          <CommandList id="model-selector">
            {/* <CommandEmpty>모델 못 찾음</CommandEmpty> */}
            <CommandGroup>
              {Object.entries(MODELS_WITHOUT_IMAGE).map(
                ([key, model]: [string, ModelWithoutImage]) => (
                  <CommandItem
                    key={key}
                    value={model}
                    onSelect={(currentValue: string) => {
                      const selectedModel = currentValue as ModelWithoutImage;
                      setValue(selectedModel === value ? null : selectedModel);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    {model}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === model ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ModelSelector;
