"use client";

import CalculatorHeader from "./CalculatorHeader";
import ModeSelector from "./ModeSelector";
import ModelSelector from "./ModelSelector";

function UsageCalculatorTemplate() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <CalculatorHeader />
      <ModeSelector />
      <ModelSelector />
    </div>
  );
}

export default UsageCalculatorTemplate;
