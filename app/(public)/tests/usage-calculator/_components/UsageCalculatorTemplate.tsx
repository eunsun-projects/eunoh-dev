"use client";

import CalculateResult from "./CalculateResult";
import CalculatorHeader from "./CalculatorHeader";
import Chat from "./Chat";
import ModeSelector from "./ModeSelector";
import ModelSelector from "./ModelSelector";

function UsageCalculatorTemplate() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <CalculatorHeader />
      <ModeSelector />
      <ModelSelector />
      <CalculateResult />
      <Chat />
    </div>
  );
}

export default UsageCalculatorTemplate;
