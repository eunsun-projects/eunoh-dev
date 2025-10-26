import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
	{
		title: "skills",
		href: "/skills",
		description: "- 기술 스택",
	},
	{
		title: "projects",
		href: "/projects",
		description: "- 프로젝트",
	},
	{
		title: "posts",
		href: "/posts",
		description: "- 탐구와 기록",
	},
	{
		title: "tests",
		href: "/tests",
		description: "- 여러가지 테스트들",
	},
	{
		title: "as-an-artist",
		href: "https://work.eunoh.top",
		description: "- 예술가로서",
	},
];

interface NavProps {
	ready: boolean;
}

function Nav({ ready }: NavProps) {
	return (
		<section
			className={cn(
				"my-6 flex w-full items-center justify-between opacity-0 transition-all duration-1000 xl:my-14",
				ready && "opacity-100",
			)}
		>
			<div className="flex flex-col gap-0.5 text-sm xl:gap-1 xl:text-base">
				{NAV_ITEMS.map((item) => (
					<div key={item.title} className="flex flex-row items-center gap-2">
						<Link
							href={item.href}
							className="p-0.5 text-neutral-900 transition-all duration-200 hover:rounded-sm hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-neutral-500"
						>
							{item.title}
						</Link>
						<span className="text-xs xl:text-sm">{item.description}</span>
					</div>
				))}
			</div>
		</section>
	);
}

export default Nav;
