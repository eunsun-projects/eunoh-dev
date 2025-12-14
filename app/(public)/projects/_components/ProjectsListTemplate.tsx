"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FaGithub, FaLink } from "react-icons/fa";
import { useProjectsQuery } from "@/hooks/queries/projects";
import { Back } from "../../_components/ui";

function ProjectsListTemplate() {
	const { data: projects, error } = useProjectsQuery();

	useEffect(() => {
		if (error) console.error(error);
	}, [error]);

	return (
		<section>
			<div className="flex w-full flex-col justify-start gap-8 xl:justify-center">
				<div className="flex w-full justify-between">
					<h2 className="m-0 font-bold text-lg text-neutral-900 dark:text-neutral-50">
						{"💻 Projects 💻"}
					</h2>
					<Back isDarkLightModeButton />
				</div>
				<div className="flex w-full flex-col gap-2">
					{projects?.map((project) => (
						<div key={project.id} className="flex w-full justify-between">
							<div className="flex w-[90%] flex-row gap-0 xl:gap-2">
								<Link
									href={`/projects/${project.engTitle}`}
									className="min-w-40 xl:min-w-44"
								>
									<p className="m-0 w-fit p-0.5 text-neutral-900 text-xs transition-all duration-200 hover:rounded-sm hover:bg-neutral-300 dark:text-neutral-50 dark:hover:bg-neutral-500">
										{project.title}
									</p>
								</Link>
								<div className="flex flex-row gap-1 text-[10px] xl:text-xs">
									<span>{"- "}</span>
									{project.keywords?.map((keyword, index) => (
										<p key={keyword} className="m-0">
											{keyword}
											{project.keywords?.length !== index + 1 && ","}
										</p>
									))}
								</div>
							</div>
							<div className="flex w-[10%] flex-row items-center justify-end gap-1">
								<Link
									href={project.link as string}
									className="p-0.5 text-xs transition-all duration-200 hover:rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-500"
									target="_blank"
								>
									<FaLink />
								</Link>
								<Link
									href={project.github_link as string}
									className="p-0.5 text-xs transition-all duration-200 hover:rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-500"
									target="_blank"
								>
									<FaGithub />
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default ProjectsListTemplate;
