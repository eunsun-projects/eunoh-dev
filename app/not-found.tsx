import Link from "next/link";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function NotFound() {
	return (
		<div className="min-h-full">
			<main className="mx-auto flex min-h-[calc(100dvh-128px-28px)] max-w-[640px] flex-col gap-4 pt-[128px]">
				<div className="p-0.5">
					<h2 className="font-bold text-neutral-900 dark:text-neutral-50">
						Not Found
					</h2>
					<p>Could not find requested resource</p>
				</div>
				<div className="relative max-w-fit">
					<Link
						href="/"
						className="flex flex-row items-center gap-1 p-0.5 text-neutral-900 transition-all duration-200 hover:rounded-sm hover:bg-neutral-300 dark:text-neutral-50 dark:hover:bg-neutral-500"
					>
						<span className="text-base">Return Home</span>
						<RiArrowGoBackFill className="cursor-pointer text-base" />
					</Link>
				</div>
			</main>
		</div>
	);
}
