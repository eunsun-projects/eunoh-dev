"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReadyState } from "@/hooks/ui/useReadyState";
import { cn } from "@/lib/utils";

function Footer() {
	const pathname = usePathname();
	const { isMainReady } = useReadyState();

	return (
		<footer
			className={cn(
				"relative right-0 bottom-0 left-0 mx-auto flex max-w-[640px] items-center justify-between py-10 opacity-0 transition-opacity duration-1000 xl:py-[64px]",
				isMainReady && pathname === "/" && "opacity-100",
				pathname !== "/" && "opacity-100",
			)}
		>
			<p className="text-sm">
				{"2025 . "}
				<Link
					href="/"
					className="p-0.5 text-[13px] text-neutral-900 transition-all duration-200 hover:rounded-sm hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-neutral-500"
				>
					오은
				</Link>
			</p>
			<p className="text-base">
				<Link
					href="https://github.com/eunsun-projects/eunoh-dev"
					target="_blank"
					className="p-0.5 text-neutral-900 transition-all duration-200 hover:rounded-sm hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-neutral-500"
				>
					repo
				</Link>
			</p>
		</footer>
	);
}

export default Footer;
