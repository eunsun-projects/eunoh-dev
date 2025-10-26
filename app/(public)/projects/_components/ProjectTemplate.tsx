"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useTapScroll } from "@/hooks/ui/useTapScroll";
import type {
	Desc,
	ProjectImage,
	ProjectWithImages,
} from "@/types/project.types";
import { Back, Description, Modal, Navigate } from "../../_components/ui";
import ProjectNextImage from "./ProjectImage";

interface ProjectTemplateProps {
	project: ProjectWithImages;
}

const setStateFunction = (prev: number[] | null, index: number) => {
	if (prev === null) return [index];
	return prev.includes(index)
		? prev.filter((i) => i !== index)
		: [...prev, index];
};

function ProjectTemplate({ project }: ProjectTemplateProps) {
	const [decisionIndex, setDecisionIndex] = useState<number[] | null>(null);
	const [troubleIndex, setTroubleIndex] = useState<number[] | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);
	const imageDivRef = useRef<HTMLDivElement | null>(null);

	const handleOpenModal = useCallback(
		(image: ProjectImage) => () => {
			setSelectedImage(image);
			setIsOpen(true);
		},
		[],
	);

	const handleCloseModal = useCallback(() => {
		setIsOpen(false);
	}, []);

	const { scrollHandlers } =
		useTapScroll({
			ref: imageDivRef,
		}) ?? {};

	const handleDecisionClick = useCallback(
		(index: number) =>
			setDecisionIndex((prev) => setStateFunction(prev, index)),
		[],
	);

	const handleTroubleClick = useCallback(
		(index: number) => setTroubleIndex((prev) => setStateFunction(prev, index)),
		[],
	);

	return (
		<>
			{isOpen && selectedImage && (
				<Modal closeModal={handleCloseModal}>
					<ProjectNextImage image={selectedImage} type="modal" />
				</Modal>
			)}
			<section className="flex flex-col gap-8">
				<div className="flex w-full justify-between">
					<div className="px-0.5 transition-all duration-200 hover:rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-500">
						<Link href={project.link as string} target="_blank">
							<h2 className="font-bold text-lg text-neutral-900 dark:text-neutral-50">
								{project.title}
							</h2>
						</Link>
					</div>
					<Back isDarkLightModeButton />
				</div>
				<div className="flex flex-col gap-4">
					<p className="text-sm">
						{project.started_at?.split("T")[0].split("-").join(".")} ~{" "}
						{project.ended_at?.split("T")[0].split("-").join(".")}
					</p>
					<div className="flex flex-row gap-2">
						{project.keywords?.map((keyword) => (
							<span
								key={keyword}
								className="rounded-md border border-neutral-600 px-1 py-0.5 text-sm dark:border-neutral-400"
							>
								{keyword}
							</span>
						))}
					</div>
					{/** 이미지 영역 */}
					<div className="relative flex w-full items-center justify-center py-4">
						<div
							className="relative z-10 mx-auto flex items-center justify-start gap-2 overflow-x-scroll"
							ref={imageDivRef}
						>
							{project.newImages?.map((image) => (
								<ProjectNextImage
									key={image.image}
									image={image}
									onClick={handleOpenModal(image)}
								/>
							))}
						</div>
						{scrollHandlers?.createScrollLeft &&
							scrollHandlers?.createScrollRight && (
								<div className="absolute top-[50%] flex w-full">
									<Navigate
										mode="before"
										onClick={scrollHandlers.createScrollLeft()}
										className="top-[50%]"
									/>
									<Navigate
										mode="after"
										onClick={scrollHandlers.createScrollRight()}
										className="top-[50%]"
									/>
								</div>
							)}
					</div>

					{/** 주요 기능 및 특징 */}
					<div className="flex w-full flex-col gap-4 text-left">
						<h3 className="m-0 font-bold text-neutral-900 text-sm dark:text-neutral-50">
							🗝️ 주요 기능 및 특징
						</h3>
						<ul className="flex flex-col gap-1">
							{project.features?.map((feature) => (
								<li key={feature} className="text-xs">
									{`- ${feature}`}
								</li>
							))}
						</ul>
					</div>

					{/** 기술적 의사 결정 */}
					<Description
						mode="decisions"
						jsonObject={project.decisions as Desc[]}
						handleClick={handleDecisionClick}
						selectedIndex={decisionIndex}
					/>

					{/** 트러블 슈팅 */}
					<Description
						mode="troubles"
						jsonObject={project.troubles as Desc[]}
						handleClick={handleTroubleClick}
						selectedIndex={troubleIndex}
					/>
				</div>
			</section>
		</>
	);
}

export default ProjectTemplate;
