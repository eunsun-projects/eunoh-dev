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
import { useState } from "react";
import { MODES } from "../_libs/zustand";

function ModeSelector() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          role="combobox"
          aria-controls="mode-selector"
          aria-expanded={open}
          aria-haspopup="listbox"
          className="w-[500px] justify-between"
        >
          {value
            ? MODES[value as keyof typeof MODES]
            : "동작 모드 선택, 기본 txt-to-txt"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command>
          {/* <CommandInput placeholder="모드 검색" className="h-9" /> */}
          <CommandList id="mode-selector">
            {/* <CommandEmpty>모드 못 찾음</CommandEmpty> */}
            <CommandGroup>
              {Object.entries(MODES).map(([key, mode]) => (
                <CommandItem
                  key={key}
                  value={mode}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {mode}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === mode ? "opacity-100" : "opacity-0"
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

export default ModeSelector;
