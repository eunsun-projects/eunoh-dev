"use client";

import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import Loading from "@/app/loading";
import { usePostsQuery } from "@/hooks/queries/posts";
import { Back } from "../../_components/ui";

function PublicPostsListTemplate() {
	const { data: posts, isLoading, error } = usePostsQuery();

	const filteredPosts = useMemo(
		() => posts?.filter((post) => post.isView),
		[posts],
	);

	useEffect(() => {
		if (error) console.error(error.message);
	}, [error]);

	if (isLoading) return <Loading />;

	return (
		<section>
			<div className="flex w-full flex-col justify-start gap-8">
				<div className="flex w-full justify-between">
					<h2 className="m-0 font-bold text-lg text-neutral-900 dark:text-neutral-50">
						{"📝 Posts 📝"}
					</h2>
					<Back isDarkLightModeButton />
				</div>
				<div className="flex w-full flex-col gap-3">
					{filteredPosts?.map((post) => (
						<div key={post.id} className="flex flex-row justify-between gap-1">
							<div className="flex flex-col">
								<div>
									<Link
										key={post.id}
										href={`/posts/${post.engTitle}`}
										className="flex flex-row gap-0.5"
									>
										<h3 className="m-0 w-fit p-0.5 text-neutral-900 text-xs hover:bg-neutral-300 xl:text-sm dark:text-neutral-50 dark:hover:bg-neutral-500">
											{`(${post.category}) ${post.title}`}
										</h3>
									</Link>
								</div>
								<p className="m-0 text-[10px] xl:text-xs">{post.summary}</p>
							</div>
							<div className="flex">
								<p className="m-0 text-sm">
									{format(new Date(post.posted_at as string), "yyyy")}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default PublicPostsListTemplate;
