'use client';

import { useProjectsQuery } from '@/hooks/queries/projects';
import Link from 'next/link';
import { useEffect } from 'react';
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
        <div className="flex flex-col gap-6 w-full">
          {projects?.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="flex flex-row gap-2">
              <h3 className="text-neutral-900 dark:text-neutral-50 text-sm m-0">{project.title}</h3>
              <p className="text-sm m-0">{'- ' + project.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsListTemplate;
