"use client";

import { useTapScroll } from "@/hooks/ui/useTapScroll";
import { Desc, ProjectWithImages } from "@/types/project.types";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaGithub, FaLink } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Description from "./Description";
import Navigate from "./Navigate";

type ModalProps = {
  project: ProjectWithImages;
  closeModal: (e: React.MouseEvent) => void;
  // imageSizes: { width: number | undefined; height: number | undefined }[];
};

const setStateFunction = (prev: number[] | null, index: number) => {
  if (prev === null) return [index];
  return prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index];
};

function Modal({ project, closeModal }: ModalProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const [stackIndex, setStackIndex] = useState<number[] | null>(null);
  const [decisionIndex, setDecisionIndex] = useState<number[] | null>(null);
  const [troubleIndex, setTroubleIndex] = useState<number[] | null>(null);

  const { scrollHandlers } =
    useTapScroll({
      ref: imageRef,
    }) ?? {};

  const handleStackClick = (index: number) => setStackIndex((prev) => setStateFunction(prev, index));

  const handleDecisionClick = (index: number) => setDecisionIndex((prev) => setStateFunction(prev, index));

  const handleTroubleClick = (index: number) => setTroubleIndex((prev) => setStateFunction(prev, index));

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-sm dark:bg-black/50 bg-gray-300/50 z-50"
      onClick={closeModal}
    >
      <dialog
        open
        className="rounded-xl z-50 p-2 h-auto w-full xl:w-[90%] max-h-[90%] xl:h-auto overflow-auto border-2 bg-white dark:border-white dark:bg-gray-900 dark:text-white border-gray-400 xl:p-4 shadow-md"
      >
        <div className="sticky top-0 h-[5%] w-full flex justify-end items-center gap-0.5 pb-4 z-50">
          <div className="flex gap-2">
            <Link href={project.link ?? ""} target="_blank" className="flex justify-center items-center">
              <FaLink className="text-xl xl:text-[1.4rem]" />
            </Link>
            <Link href={project.github_link ?? ""} target="_blank">
              <FaGithub className="text-xl xl:text-2xl" />
            </Link>
          </div>
          <button type="button" onClick={closeModal}>
            <IoClose className="text-2xl xl:text-3xl" />
          </button>
        </div>

        <div className="relative h-[96%] w-full flex flex-col justify-center items-center gap-10 pb-4">
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex flex-row gap-2">
              {project.keywords?.map((keyword) => (
                <span key={keyword} className="text-sm rounded-md px-2 py-1 border-2 border-gray-300">
                  {keyword}
                </span>
              ))}
            </div>
            <Link href={project.link ?? ""} target="_blank">
              <h2 className="text-2xl font-bold">{project.title}</h2>
            </Link>
            <p className="text-sm">
              {project.started_at?.split("T")[0].split("-").join(".")} ~{" "}
              {project.ended_at?.split("T")[0].split("-").join(".")}
            </p>
          </div>
          <div className="relative flex w-[90%] py-4 justify-center items-center">
            <div
              className="relative w-fit overflow-x-scroll flex gap-2 z-10 justify-start items-center mx-auto"
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
                    alt={project.title ?? "detail image"}
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
                <Navigate mode="before" onClick={scrollHandlers.createScrollLeft()} className="top-[50%]" />
                <Navigate mode="after" onClick={scrollHandlers.createScrollRight()} className="top-[50%]" />
              </div>
            )}
          </div>

          <p className="text-base text-center whitespace-pre-wrap pb-4 break-keep">{project.description}</p>

          <div className="flex flex-col w-full gap-4 text-left">
            <h3 className="text-xl font-bold w-[95%] xl:w-[45%] text-left mx-auto">🗝️ 주요 기능 및 특징</h3>
            <ul className="list-disc list-inside w-[94%] xl:w-[45%] mx-auto flex flex-col gap-2">
              {project.features?.map((feature) => (
                <li key={feature} className="text-sm">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Description
            mode="stacks"
            jsonObject={project.stacks as Desc[]}
            handleClick={handleStackClick}
            selectedIndex={stackIndex}
          />

          <Description
            mode="decisions"
            jsonObject={project.decisions as Desc[]}
            handleClick={handleDecisionClick}
            selectedIndex={decisionIndex}
          />

          <Description
            mode="troubles"
            jsonObject={project.troubles as Desc[]}
            handleClick={handleTroubleClick}
            selectedIndex={troubleIndex}
          />
        </div>
      </dialog>
    </div>
  );
}

export default Modal;
