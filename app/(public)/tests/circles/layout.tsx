import Link from "next/link";
import type { PropsWithChildren } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import CheckLandscape from "../paradise/_components/CheckLandscape";

export default function CirclesLayout({ children }: PropsWithChildren) {
	return (
		<div className="fixed inset-0 z-50 h-screen w-screen bg-white">
			<div className="fixed top-0 left-0 z-50 h-dvh w-dvw bg-transparent">
				<Link href="/tests" className="absolute top-4 right-4 z-50">
					<RiArrowGoBackFill className="cursor-pointer text-lg" />
				</Link>
				<CheckLandscape />
				{children}
			</div>
		</div>
	);
}
