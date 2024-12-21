'use client';

import { useProjectsQuery } from '@/hooks/queries/projects';
import { useReadyState } from '@/hooks/ui/useReadyState';
import { ProjectWithImages } from '@/types/project.types';
import getImageSize from '@/utils/image/getImageSize';
import { useEffect, useState } from 'react';
import Hello from './Hello';

function Home() {
  const { isMainReady } = useReadyState();
  const [showHello, setShowHello] = useState(true);
  const { data: projects, error } = useProjectsQuery();
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

    document.documentElement.style.overscrollBehavior = 'none';
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.overscrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <Hello />
      {/* {projects && (
        <MyProjects projectsWithImageSizes={projectWithImageSizes} projects={projects} />
      )} */}
    </>
  );
}

export default Home;
