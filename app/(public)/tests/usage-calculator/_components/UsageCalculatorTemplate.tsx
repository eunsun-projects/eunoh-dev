"use client";

import CalculateResult from "./CalculateResult";
import CalculatorHeader from "./CalculatorHeader";
import Chat from "./Chat";
import ModelSelector from "./ModelSelector";
import ModeSelector from "./ModeSelector";

function UsageCalculatorTemplate() {
	return (
		<div className="flex h-dvh min-h-dvh flex-col items-center justify-start gap-2">
			<CalculatorHeader />
			<ModeSelector />
			<ModelSelector />
			<CalculateResult />
			<Chat />
		</div>
	);
}

export default UsageCalculatorTemplate;
