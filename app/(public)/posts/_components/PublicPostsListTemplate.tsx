'use client';

import { usePostsQuery } from '@/hooks/queries/posts';
import Link from 'next/link';
import { useEffect } from 'react';
import { DarkLightModeButton } from '../../_components/ui';

function PublicPostsListTemplate() {
  const { data: posts, isLoading, error } = usePostsQuery();

  useEffect(() => {
    if (error) console.error(error.message);
  }, [error]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <section>
      <div className="flex flex-col justify-start gap-8 w-[90%] h-[84%] pt-10 xl:pt-0 xl:justify-center">
        <div className="flex justify-between w-full">
          <h2 className="font-bold text-neutral-900 dark:text-neutral-50 text-lg">
            {'📝 Posts 📝'}
          </h2>
          <DarkLightModeButton />
        </div>
        <div className="flex flex-col gap-6 w-full">
          {posts?.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <h3>{post.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PublicPostsListTemplate;
