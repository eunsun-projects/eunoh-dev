"use client";

import { useTapScroll } from "@/hooks/ui/useTapScroll";
import type {
  Desc,
  ProjectImage,
  ProjectWithImages,
} from "@/types/project.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import {
  DarkLightModeButton,
  Description,
  Modal,
  Navigate,
} from "../../_components/ui";
import ProjectNextImage from "./ProjectImage";

interface ProjectTemplateProps {
  project: ProjectWithImages;
}

const setStateFunction = (prev: number[] | null, index: number) => {
  if (prev === null) return [index];
  return prev.includes(index)
    ? prev.filter((i) => i !== index)
    : [...prev, index];
};

function ProjectTemplate({ project }: ProjectTemplateProps) {
  const router = useRouter();

  const [decisionIndex, setDecisionIndex] = useState<number[] | null>(null);
  const [troubleIndex, setTroubleIndex] = useState<number[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);
  const imageDivRef = useRef<HTMLDivElement | null>(null);

  const handleOpenModal = useCallback(
    (image: ProjectImage) => () => {
      setSelectedImage(image);
      setIsOpen(true);
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const { scrollHandlers } =
    useTapScroll({
      ref: imageDivRef,
    }) ?? {};

  const handleDecisionClick = useCallback(
    (index: number) =>
      setDecisionIndex((prev) => setStateFunction(prev, index)),
    []
  );

  const handleTroubleClick = useCallback(
    (index: number) => setTroubleIndex((prev) => setStateFunction(prev, index)),
    []
  );

  return (
    <>
      {isOpen && selectedImage && (
        <Modal closeModal={handleCloseModal}>
          <ProjectNextImage image={selectedImage} type="modal" />
        </Modal>
      )}
      <section className="flex flex-col gap-8">
        <div className="w-full flex justify-between">
          <div className="dark:hover:bg-neutral-500 hover:bg-neutral-300 hover:rounded-sm transition-all duration-200 px-0.5">
            <Link href={project.link as string} target="_blank">
              <h2 className="font-bold text-neutral-900 dark:text-neutral-50 text-lg">
                {project.title}
              </h2>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <RiArrowGoBackFill
              className="text-lg cursor-pointer"
              onClick={() => router.back()}
            />
            <DarkLightModeButton />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-sm">
            {project.started_at?.split("T")[0].split("-").join(".")} ~{" "}
            {project.ended_at?.split("T")[0].split("-").join(".")}
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
              ref={imageDivRef}
            >
              {project.newImages?.map((image) => (
                <ProjectNextImage
                  key={image.image}
                  image={image}
                  onClick={handleOpenModal(image)}
                />
              ))}
            </div>
            {scrollHandlers?.createScrollLeft &&
              scrollHandlers?.createScrollRight && (
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
                  {`- ${feature}`}
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
    </>
  );
}

export default ProjectTemplate;
