"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { SiTistory } from "react-icons/si";
import { cn } from "@/lib/utils";
import Mails from "./Mails";

interface LinksProps {
	ready: boolean;
}

function Links({ ready }: LinksProps) {
	return (
		<div
			className={cn(
				"left-2 flex w-full flex-row items-center justify-end gap-1 text-xs opacity-0 transition-all duration-1000 xl:gap-2 xl:text-sm",
				ready && "opacity-100",
			)}
		>
			<Mails />
			<Link
				href="https://github.com/eunohhh"
				className="p-0.5 text-neutral-900 transition-all duration-200 hover:rounded-sm hover:bg-neutral-300 dark:text-neutral-50 dark:hover:bg-neutral-500"
				target="_blank"
			>
				<FaGithub />
			</Link>
			<Link
				href="https://ifelseif.tistory.com"
				className="p-0.5 text-neutral-900 transition-all duration-200 hover:rounded-sm hover:bg-neutral-300 dark:text-neutral-50 dark:hover:bg-neutral-500"
				target="_blank"
			>
				<SiTistory className="text-[11px] xl:text-sm" />
			</Link>
		</div>
	);
}

export default Links;
