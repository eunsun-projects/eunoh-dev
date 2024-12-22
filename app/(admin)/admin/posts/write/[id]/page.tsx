'use client';

import { usePostsQuery } from '@/hooks/queries/posts';
import { use, useEffect } from 'react';
import PostsWriteTemplate from '../../_components/PostsWriteTemplate';

function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { data, isLoading, error } = usePostsQuery();
  const { id } = use(params);
  const post = data?.find((post) => post.id === id);

  useEffect(() => {
    if (error) console.error(error.message);
  }, [error]);

  if (isLoading) return <div>Loading...</div>;

  return <PostsWriteTemplate mode="edit" post={post} />;
}

export default EditPage;
