"use client";

import "highlight.js/styles/a11y-dark.css";
import { format } from "date-fns";
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
				<div className="flex flex-row items-center gap-4">
					<h2 className="m-0 font-bold text-lg text-neutral-900 dark:text-neutral-50">
						{post.title}
					</h2>
					<p className="m-0 text-sm">
						{format(new Date(post.posted_at as string), "yyyy.MM.dd")}
					</p>
				</div>
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
