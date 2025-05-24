import type { Metadata } from "next";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { AudioProvider } from "./_components/AudioProvider";
import CheckLandscape from "./_components/CheckLandscape";

export const metadata: Metadata = {
  title: "Paradise",
  description: "Paradise",
};

function ParadiseLayout({ children }: PropsWithChildren) {
  return (
    <AudioProvider>
      <div className="fixed top-0 left-0 w-dvw h-dvh bg-transparent z-50">
        <Link href="/tests" className="absolute top-4 right-4 z-50">
          <RiArrowGoBackFill className="text-lg cursor-pointer" />
        </Link>
        <CheckLandscape />
        {children}
      </div>
    </AudioProvider>
  );
}

export default ParadiseLayout;
