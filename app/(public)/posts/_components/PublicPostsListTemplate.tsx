'use client';

import Loading from '@/app/loading';
import { usePostsQuery } from '@/hooks/queries/posts';
import { format } from 'date-fns';
import Link from 'next/link';
import { useEffect } from 'react';
import { DarkLightModeButton } from '../../_components/ui';

function PublicPostsListTemplate() {
  const { data: posts, isLoading, error } = usePostsQuery();

  const filteredPosts = posts?.filter((post) => post.isView);

  useEffect(() => {
    if (error) console.error(error.message);
  }, [error]);

  if (isLoading) return <Loading />;

  return (
    <section>
      <div className="w-full flex flex-col justify-start gap-8 pt-10 xl:pt-0 xl:justify-center">
        <div className="flex justify-between w-full">
          <h2 className="font-bold text-neutral-900 dark:text-neutral-50 text-lg m-0">
            {'📝 Posts 📝'}
          </h2>
          <DarkLightModeButton />
        </div>
        <div className="flex flex-col gap-3 w-full">
          {filteredPosts?.map((post) => (
            <div key={post.id} className="flex flex-row justify-between gap-1">
              <div className="flex flex-col">
                <div>
                  <Link
                    key={post.id}
                    href={`/posts/${post.engTitle}`}
                    className="flex flex-row gap-0.5"
                  >
                    <h3 className="w-fit text-neutral-900 dark:text-neutral-50 text-sm m-0 p-0.5 dark:hover:bg-neutral-500 hover:bg-neutral-300">
                      {`(${post.category}) ${post.title}`}
                    </h3>
                  </Link>
                </div>
                <p className="text-xs m-0">{post.summary}</p>
              </div>
              <div className="flex">
                <p className="text-sm m-0">{format(new Date(post.posted_at as string), 'yyyy')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PublicPostsListTemplate;
