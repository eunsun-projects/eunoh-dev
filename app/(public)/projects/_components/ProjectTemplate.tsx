'use client';

import { useTapScroll } from '@/hooks/ui/useTapScroll';
import { Desc, ProjectWithImages } from '@/types/project.types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { DarkLightModeButton, Description, Navigate } from '../../_components/ui';

interface ProjectTemplateProps {
  project: ProjectWithImages;
}

const setStateFunction = (prev: number[] | null, index: number) => {
  if (prev === null) return [index];
  return prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index];
};

function ProjectTemplate({ project }: ProjectTemplateProps) {
  const router = useRouter();

  const [decisionIndex, setDecisionIndex] = useState<number[] | null>(null);
  const [troubleIndex, setTroubleIndex] = useState<number[] | null>(null);

  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollHandlers } =
    useTapScroll({
      ref: imageRef,
    }) ?? {};

  const handleDecisionClick = useCallback(
    (index: number) => setDecisionIndex((prev) => setStateFunction(prev, index)),
    [setDecisionIndex],
  );

  const handleTroubleClick = useCallback(
    (index: number) => setTroubleIndex((prev) => setStateFunction(prev, index)),
    [setTroubleIndex],
  );

  return (
    <section className="flex flex-col gap-8">
      <div className="w-full flex justify-between">
        <h2 className="font-bold text-neutral-900 dark:text-neutral-50 text-lg m-0">
          {project.title}
        </h2>
        <div className="flex items-center gap-2">
          <RiArrowGoBackFill className="text-lg cursor-pointer" onClick={() => router.back()} />
          <DarkLightModeButton />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          {project.started_at?.split('T')[0].split('-').join('.')} ~{' '}
          {project.ended_at?.split('T')[0].split('-').join('.')}
        </p>
        <div className="flex flex-row gap-2">
          {project.keywords?.map((keyword) => (
            <span
              key={keyword}
              className="text-sm rounded-md px-1 py-0.5 border border-neutral-600 dark:border-neutral-400"
            >
              {keyword}
            </span>
          ))}
        </div>
        {/** 이미지 영역 */}
        <div className="relative flex w-full py-4 justify-center items-center">
          <div
            className="relative overflow-x-scroll flex gap-2 z-10 justify-start items-center mx-auto"
            ref={imageRef}
          >
            {project.newImages?.map((image) => (
              <div
                className="relative"
                key={image.image}
                style={{
                  minWidth: `${image.width / 2}px`,
                  aspectRatio: `${image.width / image.height}`,
                  width: `${image.width / 2}px`,
                  height: `${image.height / 2}px`,
                }}
              >
                <Image
                  src={image.image}
                  alt={project.title ?? 'detail image'}
                  priority
                  fill
                  unoptimized
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
          {scrollHandlers?.createScrollLeft && scrollHandlers?.createScrollRight && (
            <div className="absolute flex w-full top-[50%]">
              <Navigate
                mode="before"
                onClick={scrollHandlers.createScrollLeft()}
                className="top-[50%]"
              />
              <Navigate
                mode="after"
                onClick={scrollHandlers.createScrollRight()}
                className="top-[50%]"
              />
            </div>
          )}
        </div>

        {/** 주요 기능 및 특징 */}
        <div className="flex flex-col w-full gap-4 text-left">
          <h3 className="font-bold m-0 text-neutral-900 dark:text-neutral-50 text-sm">
            🗝️ 주요 기능 및 특징
          </h3>
          <ul className="flex flex-col gap-1">
            {project.features?.map((feature) => (
              <li key={feature} className="text-xs">
                {'- ' + feature}
              </li>
            ))}
          </ul>
        </div>

        {/** 기술적 의사 결정 */}
        <Description
          mode="decisions"
          jsonObject={project.decisions as Desc[]}
          handleClick={handleDecisionClick}
          selectedIndex={decisionIndex}
        />

        {/** 트러블 슈팅 */}
        <Description
          mode="troubles"
          jsonObject={project.troubles as Desc[]}
          handleClick={handleTroubleClick}
          selectedIndex={troubleIndex}
        />
      </div>
    </section>
  );
}

export default ProjectTemplate;
