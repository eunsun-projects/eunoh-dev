'use client';

import { useProjectsQuery } from '@/hooks/queries/projects';
import Link from 'next/link';
import { useEffect } from 'react';
import { FaGithub, FaLink } from 'react-icons/fa';
import { DarkLightModeButton } from '../../_components/ui';

function ProjectsListTemplate() {
  const { data: projects, error } = useProjectsQuery();

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return (
    <section>
      <div className="flex flex-col justify-start gap-8 w-[90%] h-[84%] pt-10 xl:pt-0 xl:justify-center">
        <div className="flex justify-between w-full">
          <h2 className="font-bold text-neutral-900 dark:text-neutral-50 text-lg m-0">
            {'💻 Projects 💻'}
          </h2>
          <DarkLightModeButton />
        </div>
        <div className="flex flex-col gap-2 w-full">
          {projects?.map((project) => (
            <div key={project.id} className="w-full flex justify-between">
              <div className="flex flex-row gap-2 w-[90%]">
                <Link href={`/projects/${project.id}`} className="min-w-44">
                  <h3 className="w-fit text-neutral-900 dark:text-neutral-50 text-xs m-0 p-0.5 hover:bg-neutral-500 hover:rounded-sm transition-all duration-200">
                    {project.title}
                  </h3>
                </Link>
                <div className="flex flex-row gap-1 text-xs">
                  <span>{'- '}</span>
                  {project.keywords?.map((keyword, index) => (
                    <p key={keyword} className="m-0">
                      {keyword}
                      {project.keywords?.length !== index + 1 && ','}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex flex-row gap-1 justify-end w-[10%]">
                <Link
                  href={project.link as string}
                  className="text-xs p-0.5 hover:bg-neutral-500 hover:rounded-sm transition-all duration-200"
                  target="_blank"
                >
                  <FaLink />
                </Link>
                <Link
                  href={project.github_link as string}
                  className="text-xs p-0.5 hover:bg-neutral-500 hover:rounded-sm transition-all duration-200"
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
