"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/hooks/auth/useAuth";
import { useProjectMutation } from "@/hooks/queries/projects";
import { cn } from "@/lib/utils";
import type { PartialProject } from "@/types/project.types";
import parseTextToObjects from "@/utils/common/parseTextToObjects";

const inputStyle = "w-[180px] border border-gray-300 rounded-md p-2";

type FormValues = {
	title?: string;
	description?: string;
	keywords1?: string;
	keywords2?: string;
	keywords3?: string;
	link?: string;
	github_link?: string;
	started_at?: string;
	ended_at?: string;
	features?: string;
	stacks?: string;
	decisions?: string;
	troubles?: string;
	images?: FileList;
	isView?: boolean;
	number?: number;
};

type AdminWritePageProps = {
	mode?: "write" | "edit";
	project?: PartialProject;
};

function AdminWritePage({ mode = "write", project }: AdminWritePageProps) {
	const { user } = useAuth();
	const { register, handleSubmit, watch } = useForm();
	const { mutate, isPending, error } = useProjectMutation();
	const router = useRouter();

	const titleId = useId();
	const imageId = useId();
	const descriptionId = useId();
	const keywords1Id = useId();
	const keywords2Id = useId();
	const keywords3Id = useId();
	const linkId = useId();
	const github_linkId = useId();
	const started_atId = useId();
	const ended_atId = useId();
	const featuresId = useId();
	const stacksId = useId();
	const decisionsId = useId();
	const troublesId = useId();
	const isViewId = useId();
	const numberId = useId();

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		// 입력된 텍스트를 파싱하여 객체 배열로 변환
		const newFeatureArr = data.features?.split(" / ") || [];
		const newStacksArr = parseTextToObjects(data.stacks || "");
		const newDecisionsArr = parseTextToObjects(data.decisions || "");
		const newTroublesArr = parseTextToObjects(data.troubles || "");

		const newProject: PartialProject = {
			title: mode === "edit" && !data.title ? project?.title : data.title,
			description:
				mode === "edit" && !data.description
					? project?.description
					: data.description,
			keywords:
				mode === "edit" && !data.keywords1 && !data.keywords2 && !data.keywords3
					? project?.keywords
					: ([data.keywords1, data.keywords2, data.keywords3].filter(
							Boolean,
						) as string[]),
			link: mode === "edit" && !data.link ? project?.link : data.link,
			github_link:
				mode === "edit" && !data.github_link
					? project?.github_link
					: data.github_link,
			started_at:
				mode === "edit" && !data.started_at
					? project?.started_at
					: data.started_at,
			ended_at:
				mode === "edit" && !data.ended_at ? project?.ended_at : data.ended_at,
			features:
				mode === "edit" && !data.features ? project?.features : newFeatureArr,
			stacks: mode === "edit" && !data.stacks ? project?.stacks : newStacksArr,
			decisions:
				mode === "edit" && !data.decisions
					? project?.decisions
					: newDecisionsArr,
			troubles:
				mode === "edit" && !data.troubles ? project?.troubles : newTroublesArr,
			isView:
				mode === "edit" && data.isView === undefined
					? project?.isView
					: data.isView,
			number: mode === "edit" && !data.number ? project?.number : data.number,
		};

		if (mode === "edit") {
			newProject.id = project?.id;
			newProject.images = project?.images;
		}

		const formData = new FormData();
		if (data.images && data.images.length > 0) {
			for (let i = 0; i < data.images.length; i++) {
				formData.append("images", data.images[i]);
			}
		}
		formData.append("project", JSON.stringify(newProject));

		mutate(formData);
		router.push("/admin/authed/projects");
	};

	useEffect(() => {
		if (error) console.error(error.message);
	}, [error]);

	if (!user) {
		return <div>로그인 후 이용해주세요.</div>;
	}

	return (
		<>
			{isPending && (
				<div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/50 px-8 text-white">
					로딩중...
				</div>
			)}
			<section className="flex h-full w-full flex-col items-center justify-center gap-2 text-xs">
				<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-row items-center gap-2">
						<label htmlFor={imageId}>이미지</label>
						<input
							type="file"
							accept="image/*"
							multiple
							className={inputStyle}
							id={imageId}
							{...register("images")}
						/>
					</div>
					<div className="flex flex-row items-center gap-2">
						<label htmlFor={numberId}>번호</label>
						<input
							type="number"
							className={inputStyle}
							id={numberId}
							defaultValue={
								mode === "edit" ? project?.number?.toString() || "" : ""
							}
							{...register("number")}
						/>
					</div>
					<div className="flex flex-row items-center gap-2">
						<label htmlFor={titleId}>타이틀</label>
						<input
							type="text"
							className={inputStyle}
							id={titleId}
							defaultValue={mode === "edit" ? project?.title || "" : ""}
							{...register("title")}
						/>
					</div>
					<div className="flex flex-row items-center gap-2">
						<label htmlFor={descriptionId}>설명</label>
						<textarea
							className={cn(inputStyle, "h-[100px] w-[300px] xl:w-[500px]")}
							id={descriptionId}
							defaultValue={mode === "edit" ? project?.description || "" : ""}
							{...register("description")}
						/>
					</div>
					<div className="flex flex-row items-center gap-2">
						<label htmlFor={keywords1Id}>키워드</label>
						<input
							type="text"
							className={cn(inputStyle, "w-[120px]")}
							id={keywords1Id}
							defaultValue={mode === "edit" ? project?.keywords?.[0] || "" : ""}
							{...register("keywords1")}
						/>
						<input
							type="text"
							className={cn(inputStyle, "w-[120px]")}
							id={keywords2Id}
							defaultValue={mode === "edit" ? project?.keywords?.[1] || "" : ""}
							{...register("keywords2")}
						/>
						<input
							type="text"
							className={cn(inputStyle, "w-[120px]")}
							id={keywords3Id}
							defaultValue={mode === "edit" ? project?.keywords?.[2] || "" : ""}
							{...register("keywords3")}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label htmlFor={linkId}>링크</label>
						<input
							type="text"
							className={cn(inputStyle, "w-[300px]")}
							id={linkId}
							defaultValue={mode === "edit" ? project?.link || "" : ""}
							{...register("link")}
						/>
						<label htmlFor={github_linkId}>깃허브 링크</label>
						<input
							type="text"
							className={cn(inputStyle, "w-[300px]")}
							id={github_linkId}
							defaultValue={mode === "edit" ? project?.github_link || "" : ""}
							{...register("github_link")}
						/>
					</div>
					<div className="flex flex-row items-center gap-2">
						<label htmlFor={started_atId}>시작일</label>
						<input
							type="date"
							className={inputStyle}
							id={started_atId}
							defaultValue={mode === "edit" ? project?.started_at || "" : ""}
							{...register("started_at")}
						/>
						<label htmlFor={ended_atId}>종료일</label>
						<input
							type="date"
							className={inputStyle}
							id={ended_atId}
							defaultValue={mode === "edit" ? project?.ended_at || "" : ""}
							{...register("ended_at")}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label htmlFor={featuresId}>주요기능</label>
						<textarea
							className={cn(inputStyle, "h-[100px] w-[300px] xl:w-[500px]")}
							id={featuresId}
							defaultValue={
								mode === "edit" ? project?.features?.join(" / ") || "" : ""
							}
							{...register("features")}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label htmlFor={stacksId}>사용기술</label>
						<textarea
							className={cn(inputStyle, "h-[100px] w-[300px] xl:w-[500px]")}
							id={stacksId}
							{...register("stacks")}
							defaultValue={
								mode === "edit"
									? project?.stacks
											?.map((stack) =>
												typeof stack === "object" &&
												stack !== null &&
												"subTitle" in stack &&
												"subContent" in stack
													? `${stack.subTitle || ""} : ${stack.subContent || ""}`
													: "",
											)
											.join(" / ") || ""
									: ""
							}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label htmlFor={decisionsId}>기술적의사결정</label>
						<textarea
							className={cn(inputStyle, "h-[100px] w-[300px] xl:w-[500px]")}
							id={decisionsId}
							{...register("decisions")}
							defaultValue={
								mode === "edit"
									? project?.decisions
											?.map((decision) =>
												typeof decision === "object" &&
												decision !== null &&
												"subTitle" in decision &&
												"subContent" in decision
													? `${decision.subTitle || ""} : ${decision.subContent || ""}`
													: "",
											)
											.join(" / ") || ""
									: ""
							}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label htmlFor={troublesId}>트러블슈팅</label>
						<textarea
							className={cn(inputStyle, "h-[100px] w-[250px] xl:w-[500px]")}
							id={troublesId}
							{...register("troubles")}
							defaultValue={
								mode === "edit"
									? project?.troubles
											?.map((trouble) =>
												typeof trouble === "object" &&
												trouble !== null &&
												"subTitle" in trouble &&
												"subContent" in trouble
													? `${trouble.subTitle || ""} : ${trouble.subContent || ""}`
													: "",
											)
											.join(" / ") || ""
									: ""
							}
						/>
					</div>
					<div className="flex flex-row items-center gap-2">
						<label htmlFor={isViewId}>노출여부</label>
						<input
							type="checkbox"
							className={inputStyle}
							id={isViewId}
							{...register("isView")}
							defaultChecked={
								mode === "edit" ? project?.isView || false : false
							}
						/>
					</div>
					<button
						className="mx-auto mb-20 w-[50%] rounded-md bg-blue-500 p-2 text-white"
						type="submit"
					>
						작성하기
					</button>
				</form>
			</section>
		</>
	);
}

export default AdminWritePage;
