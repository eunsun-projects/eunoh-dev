import { Metadata, Viewport } from 'next';
import ViewerTemplate from './_components/ViewerTemplate';

export const metadata: Metadata = {
  title: '3D Viewer',
  description: '3D Viewer',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function ViewerPage() {
  return <ViewerTemplate />;
}
