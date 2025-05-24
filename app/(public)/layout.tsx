import { UiStateProvider } from "@/contexts/ready.context";
import type React from "react";
import { OverScroll } from "./_components/ui";
import Footer from "./_components/ui/Footer";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <UiStateProvider>
      <OverScroll />
      <div className="min-h-full">
        <main className="max-w-[640px] mx-auto pt-[64px] min-h-[calc(100dvh-128px-28px)] xl:pt-[128px]">
          {children}
        </main>
        <Footer />
      </div>
    </UiStateProvider>
  );
}

export default MainLayout;
