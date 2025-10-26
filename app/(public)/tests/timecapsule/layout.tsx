import type { PropsWithChildren } from "react";

export default function TimeCapsuleLayout({ children }: PropsWithChildren) {
	return (
		<div className="fixed inset-0 z-50 h-screen w-screen bg-black">
			{children}
		</div>
	);
}
