import { useProjectsQuery } from "@/hooks/queries/projects";
import { useUiState } from "@/hooks/ui/useUiState";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";

function MyProjects() {
    const { mainReady } = useUiState();
    const { ref, inView } = useInView({
        threshold: 0.3,
    });
    const { data: projects, isLoading, error } = useProjectsQuery();
    const [mouseOver, setMouseOver] = useState<string | null>(null);

    useEffect(() => {
        if (error) console.error(error);
    }, [error]);

    return (
        <section
            className={twMerge(
                "relative flex-col items-center justify-center h-dvh transition-opacity opacity-0 duration-1000 hidden w-full xl:gap-10",
                mainReady && "flex",
                isLoading && "opacity-0",
                inView && "opacity-100"
            )}
            ref={ref}
        >
            <div className="flex justify-center w-full h-[6%]">
                <h2 className="font-bold text-3xl xl:text-5xl">{"💻Projects💻"}</h2>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-4 place-items-center xl:gap-6 w-[55%] h-[80%] xl:px-2 xl:h-[70%]">
                {projects
                    ?.filter((project) => project.isView)
                    .map((project) => (
                        <div
                            key={project.id}
                            className="relative flex flex-col items-center justify-center w-full h-full border rounded hover:scale-105 transition-all duration-300 will-change-transform"
                            onMouseEnter={() => setMouseOver(project.id)}
                            onMouseLeave={() => setMouseOver(null)}
                        >
                            <div
                                className={twMerge(
                                    "hidden absolute w-full h-[90%]",
                                    mouseOver === project.id && "flex flex-col items-center justify-center"
                                )}
                            >
                                <Link
                                    href={project.github_link ?? ""}
                                    target="_blank"
                                    className="border rounded-sm p-2 hover:bg-gray-100 hover:text-gray-900"
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
                                <div className="relative h-1/2 aspect-auto w-full">
                                    <Image
                                        src={project?.images?.[0] ?? ""}
                                        alt={project?.title ?? "thumbnail"}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover rounded-sm"
                                        priority
                                    />
                                </div>
                                <div className="h-1/2 flex flex-col items-center justify-center">
                                    <h3 className="text-sm font-bold">{project.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
}

export default MyProjects;
