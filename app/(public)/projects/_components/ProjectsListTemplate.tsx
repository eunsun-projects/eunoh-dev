"use client";

import { useProjectsQuery } from "@/hooks/queries/projects";
import Link from "next/link";
import { useEffect } from "react";
import { FaGithub, FaLink } from "react-icons/fa";
import { Back } from "../../_components/ui";

function ProjectsListTemplate() {
  const { data: projects, error } = useProjectsQuery();

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return (
    <section>
      <div className="w-full flex flex-col justify-start gap-8 xl:justify-center">
        <div className="flex justify-between w-full">
          <h2 className="font-bold text-neutral-900 dark:text-neutral-50 text-lg m-0">
            {"💻 Projects 💻"}
          </h2>
          <Back isDarkLightModeButton />
        </div>
        <div className="flex flex-col gap-2 w-full">
          {projects?.map((project) => (
            <div key={project.id} className="w-full flex justify-between">
              <div className="flex flex-row gap-0 w-[90%] xl:gap-2">
                <Link
                  href={`/projects/${project.engTitle}`}
                  className="min-w-40 xl:min-w-44"
                >
                  <h3 className="w-fit text-neutral-900 dark:text-neutral-50 text-xs m-0 p-0.5 dark:hover:bg-neutral-500 hover:bg-neutral-300 hover:rounded-sm transition-all duration-200">
                    {project.title}
                  </h3>
                </Link>
                <div className="flex flex-row gap-1 text-[10px] xl:text-xs">
                  <span>{"- "}</span>
                  {project.keywords?.map((keyword, index) => (
                    <p key={keyword} className="m-0">
                      {keyword}
                      {project.keywords?.length !== index + 1 && ","}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex flex-row gap-1 justify-end items-center w-[10%]">
                <Link
                  href={project.link as string}
                  className="text-xs p-0.5 dark:hover:bg-neutral-500 hover:bg-neutral-300 hover:rounded-sm transition-all duration-200"
                  target="_blank"
                >
                  <FaLink />
                </Link>
                <Link
                  href={project.github_link as string}
                  className="text-xs p-0.5 dark:hover:bg-neutral-500 hover:bg-neutral-300 hover:rounded-sm transition-all duration-200"
                  target="_blank"
                >
                  <FaGithub />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsListTemplate;
