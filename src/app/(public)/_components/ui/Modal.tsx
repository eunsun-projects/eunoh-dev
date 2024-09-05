"use client";

import { useTapScroll } from "@/hooks/ui/useTapScroll";
import { Project } from "@/types/project.types";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaGithub, FaLink } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Navigate from "./Navigate";

type ModalProps = {
    project: Project;
    closeModal: () => void;
    imageSizes: { width: number | undefined; height: number | undefined }[];
};

function Modal({ project, closeModal, imageSizes }: ModalProps) {
    const imageRef = useRef<HTMLImageElement>(null);

    console.log(imageSizes);

    const { createScrollLeft, createScrollRight } =
        useTapScroll({
            refs: [imageRef],
        }) ?? {};

    return (
        <div className="bg-black/50 fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 backdrop-blur-sm">
            <dialog
                open
                className="rounded-xl z-50 w-[90%] xl:w-[90%] h-[90%] xl:h-[90%] bg-white dark:bg-gray-900 dark:border-2 dark:border-white dark:text-white overflow-hidden"
            >
                <div className="relative h-[5%] w-full flex justify-end items-center gap-0.5">
                    <div className="flex gap-2">
                        <Link
                            href={project.link ?? ""}
                            target="_blank"
                            className="flex justify-center items-center"
                        >
                            <FaLink className="text-xl xl:text-[1.4rem]" />
                        </Link>
                        <Link href={project.github_link ?? ""} target="_blank">
                            <FaGithub className="text-xl xl:text-2xl" />
                        </Link>
                    </div>
                    <button onClick={closeModal}>
                        <IoClose className="text-2xl xl:text-3xl" />
                    </button>
                </div>

                <div className="relative h-[96%] w-full flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <div className="flex flex-row gap-2">
                            {project.keywords?.map((keyword) => (
                                <span
                                    key={keyword}
                                    className="text-sm rounded-md px-2 py-1 border-2 border-gray-300"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                        <h2 className="text-2xl font-bold">{project.title}</h2>
                        <p className="text-sm">
                            {project.started_at?.split("T")[0].split("-").join(".")} ~{" "}
                            {project.ended_at?.split("T")[0].split("-").join(".")}
                        </p>
                    </div>
                    <div className="relative flex w-[90%] py-4 justify-center items-center">
                        <div
                            className="relative overflow-x-auto w-full flex gap-2 z-10 justify-center items-center mx-auto"
                            ref={imageRef}
                        >
                            {imageSizes &&
                                project.images?.map((image, index) => (
                                    <div key={image} className="relative overflow-hidden">
                                        <Image
                                            src={image}
                                            alt={project.title ?? "detail image"}
                                            width={imageSizes[index].width}
                                            height={imageSizes[index].height}
                                            priority
                                            unoptimized
                                            className="h-auto w-auto relative"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                        />
                                    </div>
                                ))}
                        </div>
                        {createScrollLeft && createScrollRight && (
                            <div className="absolute flex w-full top-[50%]">
                                <Navigate
                                    mode="before"
                                    onClick={createScrollLeft(imageRef)}
                                    className="top-[50%]"
                                />
                                <Navigate
                                    mode="after"
                                    onClick={createScrollRight(imageRef)}
                                    className="top-[50%]"
                                />
                            </div>
                        )}
                    </div>

                    <p className="text-base text-center whitespace-pre-wrap">{project.description}</p>
                </div>
            </dialog>
        </div>
    );
}

export default Modal;
