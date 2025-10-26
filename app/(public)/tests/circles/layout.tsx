import type { PropsWithChildren } from "react";
import { Back } from "@/app/(public)/_components/ui";
import CheckLandscape from "../paradise/_components/CheckLandscape";

export default function CirclesLayout({ children }: PropsWithChildren) {
	return (
		<div className="fixed inset-0 z-50 h-screen w-screen bg-white">
			<Back
				className="absolute top-1 right-1 z-[1001]"
				iconClassName="text-black"
			/>
			<CheckLandscape />
			{children}
		</div>
	);
}
