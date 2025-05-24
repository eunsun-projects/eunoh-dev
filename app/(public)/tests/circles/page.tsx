import type { Metadata, Viewport } from "next";
import CirclesTemplate from "./_components/CirclesTemplate";

export const metadata: Metadata = {
  title: "Circles",
  description: "Circles",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function CirclesPage() {
  return <CirclesTemplate />;
}
