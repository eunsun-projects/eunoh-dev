import { useProjectsQuery } from "@/hooks/queries/projects";
import { useUiState } from "@/hooks/ui/useUiState";
import { Project, ProjectWithImages } from "@/types/project.types";
import getImageSize from "@/utils/image/getImageSize";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";
import Modal from "./ui/Modal";

function MyProjects() {
    const { mainReady } = useUiState();
    const { ref, inView } = useInView({
        threshold: 0.3,
    });
    const { data: projects, isLoading, error } = useProjectsQuery();
    const [mouseOver, setMouseOver] = useState<string | null>(null);
    const [modal, setModal] = useState<{ project: Project; index: number } | null>(null);

    const [projectWithImageSizes, setProjectWithImageSizes] = useState<ProjectWithImages[]>([]);

    const openModal = (project: Project, index: number) => setModal({ project, index });
    const closeModal = () => setModal(null);

    useEffect(() => {
        if (!projects) return;

        const promises = projects.map(async (project) => {
            const sizes = await Promise.all(project.images?.map(getImageSize) ?? []);
            const newImages =
                project.images?.map((image, i) => ({
                    image,
                    width: sizes[i]?.width ?? 0,
                    height: sizes[i]?.height ?? 0,
                })) ?? [];

            return {
                ...project,
                newImages,
            };
        });

        async function resolving() {
            const projectPromises = await Promise.all(promises);
            const filteredProjects = projectPromises.filter((project) => project.isView);
            setProjectWithImageSizes(filteredProjects);
        }
        resolving();
    }, [projects]);

    useEffect(() => {
        if (error) console.error(error);
    }, [error]);

    useEffect(() => {
        if (modal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [modal]);

    return (
        <>
            {modal && projectWithImageSizes.length > 0 && (
                <Modal project={projectWithImageSizes[modal.index]} closeModal={closeModal} />
            )}
            <section
                className={twMerge(
                    "relative flex-col items-center justify-center min-h-dvh h-full xl:h-dvh transition-opacity opacity-0 duration-1000 hidden w-full gap-6 xl:gap-10 pb-10 xl:pb-0",
                    mainReady && "flex",
                    isLoading && "opacity-0",
                    inView && "opacity-100"
                )}
                ref={ref}
            >
                <div className="flex justify-center w-full h-[6%]">
                    <h2 className="font-bold text-3xl xl:text-5xl">{"💻Projects💻"}</h2>
                </div>
                <div className="grid grid-cols-2 xl:grid-cols-4 place-items-center gap-4 xl:gap-6 w-[90%] xl:w-[55%] h-full xl:px-2 xl:h-[84%]">
                    {projects
                        ?.filter((project) => project.isView)
                        .map((project, index) => (
                            <div
                                key={project.id}
                                className="relative flex flex-col items-center justify-center w-full min-h-[200px] h-full border-2 border-gray-400 dark:border-white rounded hover:scale-105 transition-all duration-300 will-change-transform shadow-md"
                                onMouseEnter={() => setMouseOver(project.id)}
                                onMouseLeave={() => setMouseOver(null)}
                            >
                                <div
                                    className={twMerge(
                                        "hidden absolute w-full h-[90%]",
                                        mouseOver === project.id &&
                                            "flex flex-col items-center justify-center gap-2"
                                    )}
                                >
                                    <div
                                        className="border-2 rounded-sm p-2 min-w-[140px] border-gray-400 dark:border-white hover:bg-gray-100 hover:text-gray-900 flex items-center justify-center cursor-pointer"
                                        onClick={() => openModal(project, index)}
                                    >
                                        자세히 보기
                                    </div>
                                    <Link
                                        href={project.github_link ?? ""}
                                        target="_blank"
                                        className="border-2 rounded-sm p-2 min-w-[140px] border-gray-400 dark:border-white hover:bg-gray-100 hover:text-gray-900"
                                    >
                                        Github 바로가기
                                    </Link>
                                </div>

                                <div
                                    className={twMerge(
                                        "flex flex-col h-full w-full",
                                        mouseOver === project.id && "hidden"
                                    )}
                                >
                                    <div className="relative h-[60%] aspect-auto w-full">
                                        <Image
                                            src={project?.images?.[0] ?? ""}
                                            alt={project?.title ?? "thumbnail"}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover rounded-sm"
                                            priority
                                        />
                                    </div>
                                    <div className="h-[40%] flex flex-col items-center justify-center">
                                        <h3 className="text-sm font-bold">{project.title}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </section>
        </>
    );
}

export default MyProjects;