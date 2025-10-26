"use client";

import "highlight.js/styles/a11y-dark.css";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import type { Post } from "@/types/post.types";
import { Back } from "../../_components/ui";
import styles from "./markdown-style.module.css";

interface PublicPostTemplateProps {
	post: Post;
}

function PublicPostTemplate({ post }: PublicPostTemplateProps) {
	return (
		<section className="flex flex-col gap-8">
			<div className="flex w-full justify-between">
				<h2 className="m-0 font-bold text-lg text-neutral-900 dark:text-neutral-50">
					{post.title}
				</h2>
				<Back isDarkLightModeButton />
			</div>
			<div>
				<ReactMarkdown
					className={styles.markdown}
					rehypePlugins={[rehypeHighlight]}
					remarkPlugins={[remarkGfm]}
				>
					{post.markdown}
				</ReactMarkdown>
			</div>
		</section>
	);
}

export default PublicPostTemplate;
