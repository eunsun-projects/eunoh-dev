import type { PropsWithChildren } from "react";

export default function ModernMoveLayout({ children }: PropsWithChildren) {
  return <div className="fixed inset-0 h-screen w-screen z-50">{children}</div>;
}
