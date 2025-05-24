import type { Metadata, Viewport } from "next";
import ModernMoveProvider from "./_components/ModernMoveContext";
import ModernMoveTemplate from "./_components/ModernMoveTemplate";

export const metadata: Metadata = {
  title: "ModernMove",
  description: "ModernMove",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function ModernMovePage() {
  return (
    // <Suspense fallback={<Loading />}>
    <ModernMoveProvider>
      <ModernMoveTemplate />
    </ModernMoveProvider>
    // </Suspense>
  );
}
