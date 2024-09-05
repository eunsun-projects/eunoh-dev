import { useProjectsQuery } from "@/hooks/queries/projects";
import { useUiState } from "@/hooks/ui/useUiState";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";

function MyProjects() {
    const { mainReady } = useUiState();
    const { ref, inView } = useInView({
        threshold: 0.3,
    });
    const { data: projects, isLoading, error } = useProjectsQuery();

    useEffect(() => {
        if (error) console.error(error);
    }, [error]);

    return (
        <section
            className={twMerge(
                "relative flex-col items-center justify-center h-dvh transition-opacity opacity-0 duration-1000 hidden w-full",
                mainReady && "flex",
                inView && "opacity-100"
            )}
            ref={ref}
        >
            <div></div>
        </section>
    );
}

export default MyProjects;
