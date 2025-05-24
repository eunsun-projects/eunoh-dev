"use client";

import CalculatorHeader from "./CalculatorHeader";
import ModeSelector from "./ModeSelector";

function UsageCalculatorTemplate() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <CalculatorHeader />
      <ModeSelector />
    </div>
  );
}

export default UsageCalculatorTemplate;
