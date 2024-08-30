"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import { PartialProject } from "@/types/project.types";
import parseTextToObjects from "@/utils/common/parseTextToObjects";
import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

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
};

function AdminWritePage() {
    const { user } = useAuth();
    const { register, handleSubmit } = useForm();

    const titleId = useId();
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

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        // 입력된 텍스트를 파싱하여 객체 배열로 변환
        const newFeatureArr = data.features?.split(" / ") || [];
        const newStacksArr = parseTextToObjects(data.stacks || "");
        const newDecisionsArr = parseTextToObjects(data.decisions || "");
        const newTroublesArr = parseTextToObjects(data.troubles || "");

        const newProject: PartialProject = {
            title: data.title,
            description: data.description,
            keywords: [data.keywords1, data.keywords2, data.keywords3].filter(Boolean) as string[],
            link: data.link,
            github_link: data.github_link,
            started_at: data.started_at,
            ended_at: data.ended_at,
            features: newFeatureArr,
            stacks: newStacksArr,
            decisions: newDecisionsArr,
            troubles: newTroublesArr,
        };
        console.log("newProject ======>", newProject);
    };

    if (!user) {
        return <div>로그인 후 이용해주세요.</div>;
    }

    return (
        <section className="flex flex-col gap-2 w-full h-full justify-center items-center">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row gap-2 items-center">
                    <label htmlFor={titleId}>타이틀</label>
                    <input type="text" className={inputStyle} id={titleId} {...register("title")} />
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <label htmlFor={descriptionId}>설명</label>
                    <textarea
                        className={twMerge(inputStyle, "w-[300px] h-[100px] xl:w-[500px]")}
                        id={descriptionId}
                        {...register("description")}
                    />
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <label htmlFor="keywords1">키워드</label>
                    <input
                        type="text"
                        className={twMerge(inputStyle, "w-[120px]")}
                        id={keywords1Id}
                        {...register("keywords1")}
                    />
                    <input
                        type="text"
                        className={twMerge(inputStyle, "w-[120px]")}
                        id={keywords2Id}
                        {...register("keywords2")}
                    />
                    <input
                        type="text"
                        className={twMerge(inputStyle, "w-[120px]")}
                        id={keywords3Id}
                        {...register("keywords3")}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor={linkId}>링크</label>
                    <input
                        type="text"
                        className={twMerge(inputStyle, "w-[300px]")}
                        id={linkId}
                        {...register("link")}
                    />
                    <label htmlFor={github_linkId}>깃허브 링크</label>
                    <input
                        type="text"
                        className={twMerge(inputStyle, "w-[300px]")}
                        id={github_linkId}
                        {...register("github_link")}
                    />
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <label htmlFor={started_atId}>시작일</label>
                    <input
                        type="date"
                        className={inputStyle}
                        id={started_atId}
                        {...register("started_at")}
                    />
                    <label htmlFor={ended_atId}>종료일</label>
                    <input type="date" className={inputStyle} id={ended_atId} {...register("ended_at")} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor={featuresId}>주요기능</label>
                    <textarea
                        className={twMerge(inputStyle, "w-[300px] h-[100px] xl:w-[500px]")}
                        id={featuresId}
                        {...register("features")}
                        placeholder="내용1 / 내용2 / 내용3 ..."
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor={stacksId}>사용기술</label>
                    <textarea
                        className={twMerge(inputStyle, "w-[300px] h-[100px] xl:w-[500px]")}
                        id={stacksId}
                        {...register("stacks")}
                        placeholder="주제1 : 내용1 / 주제2 : 내용2 / 주제3 : 내용3 ..."
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor={decisionsId}>기술적의사결정</label>
                    <textarea
                        className={twMerge(inputStyle, "w-[300px] h-[100px] xl:w-[500px]")}
                        id={decisionsId}
                        {...register("decisions")}
                        placeholder="주제1 : 내용1 / 주제2 : 내용2 / 주제3 : 내용3 ..."
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor={troublesId}>트러블슈팅</label>
                    <textarea
                        className={twMerge(inputStyle, "w-[250px] h-[100px] xl:w-[500px]")}
                        id={troublesId}
                        {...register("troubles")}
                        placeholder="주제1 : 내용1 / 주제2 : 내용2 / 주제3 : 내용3 ..."
                    />
                </div>
                <button className="p-2 bg-blue-500 text-white rounded-md w-[50%] mx-auto" type="submit">
                    작성하기
                </button>
            </form>
        </section>
    );
}

export default AdminWritePage;
