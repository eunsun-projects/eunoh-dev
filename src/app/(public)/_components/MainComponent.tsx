"use client";

import { useProjectsQuery } from "@/hooks/queries/projects";
import { useUiState } from "@/hooks/ui/useUiState";
import { ProjectWithImages } from "@/types/project.types";
import cn from "@/utils/common/cn";
import getImageSize from "@/utils/image/getImageSize";
import { useEffect, useState } from "react";
import AboutMe from "./AboutMe";
import Hello from "./Hello";
import MyProjects from "./MyProjects";
import SkillsAndTools from "./SkillsAndTools";

function MainComponent() {
  const { mainReady } = useUiState();
  const [showHello, setShowHello] = useState(true);
  const { data: projects, isPending, error } = useProjectsQuery();
  const [projectWithImageSizes, setProjectWithImageSizes] = useState<ProjectWithImages[]>([]);

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
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowHello(false);
      } else {
        setShowHello(true);
      }
    };

    document.documentElement.style.overscrollBehavior = "none";
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.style.overscrollBehavior = "auto";
    };
  }, []);

  return (
    <main
      className={cn(
        "h-dvh flex flex-col items-center justify-center dark:bg-gray-900 dark:text-white",
        mainReady && "h-auto"
      )}
    >
      <div className={cn("transition-opacity duration-1000", showHello ? "opacity-100" : "opacity-0")}>
        <Hello />
      </div>
      <AboutMe />
      <SkillsAndTools />
      <MyProjects projectsWithImageSizes={projectWithImageSizes} isLoading={isPending} />
    </main>
  );
}

export default MainComponent;
