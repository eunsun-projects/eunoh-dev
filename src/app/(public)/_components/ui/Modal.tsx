"use client";

import { Project } from "@/types/project.types";
import Link from "next/link";
import { FaGithub, FaLink } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

type ModalProps = {
    project: Project;
    closeModal: () => void;
};

function Modal({ project, closeModal }: ModalProps) {
    return (
        <div className="bg-black/50 fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 backdrop-blur-sm">
            <dialog
                open
                className="rounded-xl z-50 w-[90%] xl:w-[90%] h-[90%] xl:h-[90%] bg-white dark:bg-gray-900 dark:border-2 dark:border-white dark:text-white"
            >
                <div className="relative h-[4%] w-full flex justify-end items-center gap-0.5">
                    <div className="flex gap-2">
                        <Link href={project.link ?? ""} target="_blank">
                            <FaLink className="text-2xl" />
                        </Link>
                        <Link href={project.github_link ?? ""} target="_blank">
                            <FaGithub className="text-2xl" />
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
                    <p className="text-base text-center whitespace-pre-wrap">{project.description}</p>
                </div>
            </dialog>
        </div>
    );
}

export default Modal;
