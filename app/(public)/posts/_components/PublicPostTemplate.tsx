'use client';

import Loading from '@/app/loading';
import { usePostQuery } from '@/hooks/queries/post/usePostQuery';
import 'highlight.js/styles/a11y-dark.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RiArrowGoBackFill } from 'react-icons/ri';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { DarkLightModeButton } from '../../_components/ui';
import './markdown-style.css';

interface PublicPostTemplateProps {
  id: string;
}

function PublicPostTemplate({ id }: PublicPostTemplateProps) {
  const router = useRouter();
  const { data: post, isLoading, error } = usePostQuery(id);

  useEffect(() => {
    if (error) console.error(error.message);
  }, [error]);

  if (isLoading) return <Loading />;

  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-between w-full">
        <h2 className="font-bold text-neutral-900 dark:text-neutral-50 text-lg m-0">
          {post?.title}
        </h2>
        <div className="flex items-center gap-2">
          <RiArrowGoBackFill className="text-lg cursor-pointer" onClick={() => router.back()} />
          <DarkLightModeButton />
        </div>
      </div>
      <div>
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{post?.markdown}</ReactMarkdown>
      </div>
    </section>
  );
}

export default PublicPostTemplate;
