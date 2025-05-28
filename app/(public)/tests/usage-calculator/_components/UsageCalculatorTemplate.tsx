"use client";

import CalculateResult from "./CalculateResult";
import CalculatorHeader from "./CalculatorHeader";
import Chat from "./Chat";
import ModeSelector from "./ModeSelector";
import ModelSelector from "./ModelSelector";

function UsageCalculatorTemplate() {
  return (
    <div className="flex flex-col gap-2 justify-start items-center h-dvh min-h-dvh">
      <CalculatorHeader />
      <ModeSelector />
      <ModelSelector />
      <CalculateResult />
      <Chat />
    </div>
  );
}

export default UsageCalculatorTemplate;
