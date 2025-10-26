import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Back } from "../../_components/ui";

export const metadata: Metadata = {
	title: "TimeCapsule",
	description: "TimeCapsule",
};

export default function TimeCapsuleLayout({ children }: PropsWithChildren) {
	return (
		<div className="fixed inset-0 z-50 h-screen w-screen bg-black">
			<Back className="absolute top-1 left-1 z-50" />
			{children}
		</div>
	);
}
