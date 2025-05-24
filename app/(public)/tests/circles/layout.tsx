import type { PropsWithChildren } from "react";

export default function CirclesLayout({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-0 h-screen w-screen bg-white z-50">
      {children}
    </div>
  );
}
