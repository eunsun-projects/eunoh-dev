'use client';

import { useProjectMutation, useProjectsQuery } from '@/hooks/queries/projects';
import { Project } from '@/types/project.types';
import cn from '@/utils/common/cn';
import Link from 'next/link';
import { useEffect } from 'react';

function AdminProjectsListPage() {
  const { data: projects, isLoading, error } = useProjectsQuery();
  const { mutate, isPending, error: mutationError } = useProjectMutation();

  const handleDelete = (project: Project) => {
    const newProject = {
      ...project,
      isView: false,
    };

    const formData = new FormData();
    formData.append('images', '');
    formData.append('project', JSON.stringify(newProject));

    mutate(formData);
  };

  useEffect(() => {
    if (error || mutationError) console.error(error || mutationError);
  }, [error, mutationError]);

  if (isLoading) return <div>Loading...</div>;
  if (isPending) return <div>Pending...</div>;

  return (
    <div className="flex flex-col gap-3 px-8">
      <h2 className="text-2xl font-bold">Projects</h2>
      <ul>
        {projects?.map((project) => (
          <li
            key={project.id}
            className={cn(
              'flex flex-row items-center justify-between gap-2',
              project.isView ? 'bg-white' : 'bg-gray-100 text-gray-400',
            )}
          >
            <span>{project.title}</span>
            <div className="flex items-center gap-2">
              <span>이동</span>
              <Link href={`/admin/projects/write/${project.id}`}>
                <span>수정</span>
              </Link>
              <span className="cursor-pointer" onClick={() => handleDelete(project)}>
                삭제
              </span>
            </div>
          </li>
        ))}
      </ul>
      <Link href="/admin/projects/write" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        <span>프로젝트 작성</span>
      </Link>
    </div>
  );
}

export default AdminProjectsListPage;
