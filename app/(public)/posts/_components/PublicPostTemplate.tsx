"use client";

import "highlight.js/styles/tokyo-night-dark.css";
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
				<div className="flex flex-col items-start justify-start sm:flex-row sm:items-center sm:gap-4">
					<h2 className="m-0 font-bold text-base text-neutral-900 sm:text-lg dark:text-neutral-50">
						{post.title}
					</h2>
					{post.posted_at && (
						<p className="m-0 text-sm">
							{format(new Date(post.posted_at), "yyyy.MM.dd")}
						</p>
					)}
				</div>
				<Back isDarkLightModeButton />
			</div>
			<div className={styles.markdown}>
				<ReactMarkdown
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
