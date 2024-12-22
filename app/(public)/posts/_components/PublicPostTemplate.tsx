'use client';

import { usePostsQuery } from '@/hooks/queries/posts';
import 'highlight.js/styles/a11y-dark.css';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import './markdown-style.css';

interface PublicPostTemplateProps {
  id: string;
}

function PublicPostTemplate({ id }: PublicPostTemplateProps) {
  const { data: posts, isLoading, error } = usePostsQuery();
  const post = posts?.find((post) => post.id === id);

  useEffect(() => {
    if (error) console.error(error.message);
  }, [error]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <section>
      <div>{post?.title}</div>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{post?.markdown}</ReactMarkdown>
    </section>
  );
}

export default PublicPostTemplate;
