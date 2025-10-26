"use client";

import { useState } from "react";
import { FaAt } from "react-icons/fa";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MailsProps {
	email?: string;
}

const DEFAULT_EMAIL = "bdohhhhh@gmail.com";

export default function Mails({ email = DEFAULT_EMAIL }: MailsProps) {
	const [copied, setCopied] = useState(false);

	const mailto = `mailto:${email}`;
	const gmail = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(
		email,
	)}`;
	const outlook = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${encodeURIComponent(
		email,
	)}`;
	const naver = `https://mail.naver.com/write/popup?to=${encodeURIComponent(
		email,
	)}`;

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(email);
			setCopied(true);
			setTimeout(() => setCopied(false), 1200);
		} catch {
			// ignore
		}
	};

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger
				className="cursor-pointer p-0.5 text-neutral-900 transition-all duration-200 hover:rounded-sm hover:bg-neutral-300 focus:bg-transparent focus-visible:outline-none dark:text-neutral-50 dark:hover:bg-neutral-500"
				aria-label="메일 보내기"
			>
				<FaAt />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-44">
				<DropdownMenuItem asChild className="cursor-pointer">
					<a href={mailto}>기본 메일 앱으로 열기</a>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => window.open(gmail, "_blank", "noopener,noreferrer")}
					className="cursor-pointer"
				>
					Gmail로 열기
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => window.open(outlook, "_blank", "noopener,noreferrer")}
					className="cursor-pointer"
				>
					Outlook.com으로 열기
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => window.open(naver, "_blank", "noopener,noreferrer")}
					className="cursor-pointer"
				>
					Naver 메일로 열기
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleCopy} className="cursor-pointer">
					{copied ? "주소 복사됨" : "주소 복사"}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
