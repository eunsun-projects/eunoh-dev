"use client";

import CalculateResult from "./CalculateResult";
import CalculatorHeader from "./CalculatorHeader";
import Chat from "./Chat";
import ModelSelector from "./ModelSelector";
import ModeSelector from "./ModeSelector";

function UsageCalculatorTemplate() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-start gap-2 md:max-w-[684px]">
			<CalculatorHeader />
			<ModeSelector />
			<ModelSelector />
			<CalculateResult />
			<Chat />
		</div>
	);
}

export default UsageCalculatorTemplate;
