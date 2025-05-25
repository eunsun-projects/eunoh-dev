import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Usage Calculator",
  description: "Usage Calculator",
};

export default function UsageLayout({ children }: PropsWithChildren) {
  return (
    <section className="absolute top-0 left-0 w-dvw min-h-dvh h-auto z-50 bg-neutral-700 flex flex-col items-center justify-start">
      {children}
      <Toaster richColors />
    </section>
  );
}
