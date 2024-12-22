'use client';

import { ProjectWithImages } from '@/types/project.types';

interface ProjectTemplateProps {
  project: ProjectWithImages;
}

function ProjectTemplate({ project }: ProjectTemplateProps) {
  return <div>{project.title}</div>;
}

export default ProjectTemplate;
