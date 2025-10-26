import type { PropsWithChildren } from "react";

export default function ModernMoveLayout({ children }: PropsWithChildren) {
	return <div className="fixed inset-0 z-50 h-screen w-screen">{children}</div>;
}
