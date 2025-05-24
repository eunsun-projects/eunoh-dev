import type { PropsWithChildren } from "react";

export default function ViewerLayout({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-0 h-screen w-screen bg-neutral-100 z-50">
      {children}
    </div>
  );
}
