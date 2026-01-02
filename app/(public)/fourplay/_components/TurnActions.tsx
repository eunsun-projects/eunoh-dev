"use client";

import { ArrowRight, CheckCircle, SkipForward } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { FourplayModelId } from "../_libs/fourplay-models";
import ModelSelect from "./ModelSelect";

interface TurnActionsProps {
	nextModel: string | null;
	assistantTurnCount: number;
	isLoading: boolean;
	onContinue: () => void;
	onContinueWithModel: (model: FourplayModelId) => void;
	onSummary: () => void;
	onFinish: () => void;
}

export default function TurnActions({
	nextModel,
	assistantTurnCount,
	isLoading,
	onContinue,
	onContinueWithModel,
	onSummary,
	onFinish,
}: TurnActionsProps) {
	const [isModelDialogOpen, setIsModelDialogOpen] = useState(false);
	const [selectedModel, setSelectedModel] = useState<FourplayModelId | null>(
		null,
	);

	const canSummary = assistantTurnCount >= 2; // 최소 2개 이상의 assistant 턴이 있어야 요약 가능

	const handleContinueWithModel = () => {
		if (selectedModel) {
			onContinueWithModel(selectedModel);
			setIsModelDialogOpen(false);
			setSelectedModel(null);
		}
	};

	return (
		<div className="flex flex-wrap items-center gap-2 border-t bg-muted/50 p-4">
			{/* 계속 (제안대로) */}
			<Button onClick={onContinue} disabled={isLoading} className="gap-2">
				<ArrowRight className="h-4 w-4" />
				Continue
				{nextModel && <span className="text-xs opacity-70">({nextModel})</span>}
			</Button>

			{/* 계속 (모델 지정) */}
			<Dialog open={isModelDialogOpen} onOpenChange={setIsModelDialogOpen}>
				<DialogTrigger asChild>
					<Button variant="outline" disabled={isLoading}>
						Select Model
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Select Next Model</DialogTitle>
						<DialogDescription>
							Choose which AI model should provide the next perspective.
						</DialogDescription>
					</DialogHeader>
					<div className="py-4">
						<ModelSelect
							value={selectedModel}
							onChange={setSelectedModel}
							placeholder="Choose a model..."
						/>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setIsModelDialogOpen(false)}
						>
							Cancel
						</Button>
						<Button onClick={handleContinueWithModel} disabled={!selectedModel}>
							Continue with Selected
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* 구분선 */}
			<div className="mx-2 h-6 w-px bg-border" />

			{/* 요약 진행 */}
			{canSummary && (
				<Button
					variant="secondary"
					onClick={onSummary}
					disabled={isLoading}
					className="gap-2"
				>
					<CheckCircle className="h-4 w-4" />
					Get Summary
				</Button>
			)}

			{/* 현재 결론으로 종료 */}
			<Button
				variant="ghost"
				onClick={onFinish}
				disabled={isLoading}
				className="gap-2"
			>
				<SkipForward className="h-4 w-4" />
				Finish Now
			</Button>
		</div>
	);
}
