"use client";

import Loading from "@/app/loading";
import { usePostQuery } from "@/hooks/queries/post/usePostQuery";
import "highlight.js/styles/a11y-dark.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { Back } from "../../_components/ui";
import styles from "./markdown-style.module.css";
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
      <div className="w-full flex justify-between">
        <h2 className="font-bold text-neutral-900 dark:text-neutral-50 text-lg m-0">
          {post?.title}
        </h2>
        <Back isDarkLightModeButton />
      </div>
      <div>
        <ReactMarkdown
          className={styles.markdown}
          rehypePlugins={[rehypeHighlight]}
          remarkPlugins={[remarkGfm]}
        >
          {post?.markdown}
        </ReactMarkdown>
      </div>
    </section>
  );
}

export default PublicPostTemplate;
