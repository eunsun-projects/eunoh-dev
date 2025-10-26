"use client";

import Link from "next/link";
import { usePostMutation, usePostsQuery } from "@/hooks/queries/posts";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/post.types";

function PostsListTemplate() {
	const { data: posts, isPending, error } = usePostsQuery();
	const {
		mutate,
		isPending: mutationPending,
		error: mutationError,
	} = usePostMutation();

	const handleDelete = (post: Post) => {
		const newPost = {
			...post,
			isView: false,
		};

		mutate(newPost);
	};

	if (isPending || mutationPending) return <div>Pending...</div>;

	return (
		<div className="flex flex-col gap-3 px-8">
			<h2 className="font-bold text-2xl">Posts</h2>
			<ul>
				{posts?.map((post) => (
					<li
						key={post.id}
						className={cn(
							"flex flex-row items-center justify-between gap-2 hover:bg-gray-300",
							post.isView ? "bg-white" : "bg-gray-300 text-gray-400",
						)}
					>
						<span>{post.title}</span>
						<div className="flex items-center gap-2">
							<span>이동</span>
							<Link href={`/admin/posts/write/${post.id}`}>
								<span>수정</span>
							</Link>
							<button
								type="button"
								className="cursor-pointer"
								onClick={() => handleDelete(post)}
								onKeyDown={(e) => {
									if (e.key === "Enter") handleDelete(post);
								}}
							>
								삭제
							</button>
						</div>
					</li>
				))}
			</ul>
			<Link
				href="/admin/posts/write"
				className="rounded-md bg-blue-500 px-4 py-2 text-white"
			>
				<span>글 작성</span>
			</Link>
		</div>
	);
}

export default PostsListTemplate;
