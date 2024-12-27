import type { ProjectImage } from '@/types/project.types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ProjectImageProps {
  image: ProjectImage;
  onClick?: () => void;
  type?: 'normal' | 'modal';
}

function ProjectNextImage({ image, onClick, type = 'normal' }: ProjectImageProps) {
  const [widthHeight, setWidthHeight] = useState<{ width: string; height: string }>({
    width: type === 'normal' ? `${image.width / 2}px` : '100%',
    height: type === 'normal' ? `${image.height / 2}px` : '100%',
  });

  useEffect(() => {
    if (type === 'normal') return;
    const innerWidth = window.innerWidth;
    if (innerWidth < 768) {
      setWidthHeight({
        width: `${image.width / 2}px`,
        height: `${image.height / 2}px`,
      });
      return;
    }
    setWidthHeight({
      width: `${image.width}px`,
      height: `${image.height}px`,
    });
  }, [image, type]);

  return (
    <div
      className="relative"
      style={{
        minWidth: widthHeight.width,
        aspectRatio: `${image.width / image.height}`,
        width: widthHeight.width,
        height: widthHeight.height,
      }}
    >
      <Image
        src={image.image}
        alt={'detail image'}
        priority
        fill
        unoptimized
        className="w-full h-full object-contain cursor-pointer"
        onClick={onClick}
      />
    </div>
  );
}

export default ProjectNextImage;
