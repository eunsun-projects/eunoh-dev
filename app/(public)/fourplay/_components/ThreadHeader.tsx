"use client";

import { ArrowLeft, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Thread } from "../_apis/fourplay-api";

interface ThreadHeaderProps {
	thread: Thread | null;
	onBack: () => void;
	onDelete?: () => void;
}

export default function ThreadHeader({
	thread,
	onBack,
	onDelete,
}: ThreadHeaderProps) {
	return (
		<header className="flex items-center justify-between border-b px-4 py-3">
			<div className="flex items-center gap-3">
				<Button variant="ghost" size="icon" onClick={onBack}>
					<ArrowLeft className="h-4 w-4" />
				</Button>
				<div>
					<h1 className="font-semibold">
						{thread?.title || "New Conversation"}
					</h1>
					{thread && (
						<p className="text-muted-foreground text-xs">
							{thread.status === "completed" ? (
								<span className="text-green-600">Completed</span>
							) : (
								<span>In progress</span>
							)}
						</p>
					)}
				</div>
			</div>

			{thread && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon">
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{onDelete && (
							<DropdownMenuItem
								onClick={onDelete}
								className="text-destructive focus:text-destructive"
							>
								<Trash2 className="mr-2 h-4 w-4" />
								Delete Thread
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</header>
	);
}
