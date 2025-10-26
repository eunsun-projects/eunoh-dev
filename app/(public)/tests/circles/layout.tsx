import type { PropsWithChildren } from "react";

export default function CirclesLayout({ children }: PropsWithChildren) {
	return (
		<div className="fixed inset-0 z-50 h-screen w-screen bg-white">
			{children}
		</div>
	);
}
