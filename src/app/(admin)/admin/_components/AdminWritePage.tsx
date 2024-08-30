"use client";

import { useAuth } from "@/hooks/auth/useAuth";
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
        const newFeatureArr = parseTextToObjects(data.features || "");
        const newStacksArr = parseTextToObjects(data.stacks || "");
        const newDecisionsArr = parseTextToObjects(data.decisions || "");
        const newTroublesArr = parseTextToObjects(data.troubles || "");
        console.log(newFeatureArr);
        console.log(newStacksArr);
        console.log(newDecisionsArr);
        console.log(newTroublesArr);
    };

    if (!user) {
        return <div>로그인 후 이용해주세요.</div>;
    }

    return (
        <section>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor={titleId}>Title</label>
                    <input type="text" className={inputStyle} id={titleId} {...register("title")} />
                </div>
                <div>
                    <label htmlFor={descriptionId}>Description</label>
                    <input
                        type="text"
                        className={inputStyle}
                        id={descriptionId}
                        {...register("description")}
                    />
                </div>
                <div>
                    <label htmlFor="keywords1">Keywords</label>
                    <input type="text" className={inputStyle} id={keywords1Id} {...register("keywords1")} />
                    <input type="text" className={inputStyle} id={keywords2Id} {...register("keywords2")} />
                    <input type="text" className={inputStyle} id={keywords3Id} {...register("keywords3")} />
                </div>
                <div>
                    <label htmlFor={linkId}>link</label>
                    <input type="text" className={inputStyle} id={linkId} {...register("link")} />
                    <label htmlFor={github_linkId}>Github link</label>
                    <input
                        type="text"
                        className={inputStyle}
                        id={github_linkId}
                        {...register("github_link")}
                    />
                </div>
                <div>
                    <label htmlFor={started_atId}>Started at</label>
                    <input
                        type="date"
                        className={inputStyle}
                        id={started_atId}
                        {...register("started_at")}
                    />
                    <label htmlFor={ended_atId}>Ended at</label>
                    <input type="date" className={inputStyle} id={ended_atId} {...register("ended_at")} />
                </div>
                <div>
                    <label htmlFor={featuresId}>Features</label>
                    <textarea
                        className={twMerge(inputStyle, "h-[100px]")}
                        id={featuresId}
                        {...register("features")}
                        placeholder="주제1 : 내용1 / 주제2 : 내용2 / 주제3 : 내용3 ..."
                    />
                </div>
                <div>
                    <label htmlFor={stacksId}>Stacks</label>
                    <textarea
                        className={twMerge(inputStyle, "h-[100px]")}
                        id={stacksId}
                        {...register("stacks")}
                        placeholder="주제1 : 내용1 / 주제2 : 내용2 / 주제3 : 내용3 ..."
                    />
                </div>
                <div>
                    <label htmlFor={decisionsId}>Decisions</label>
                    <textarea
                        className={twMerge(inputStyle, "h-[100px]")}
                        id={decisionsId}
                        {...register("decisions")}
                        placeholder="주제1 : 내용1 / 주제2 : 내용2 / 주제3 : 내용3 ..."
                    />
                </div>
                <div>
                    <label htmlFor={troublesId}>Troubles</label>
                    <textarea
                        className={twMerge(inputStyle, "h-[100px]")}
                        id={troublesId}
                        {...register("troubles")}
                        placeholder="주제1 : 내용1 / 주제2 : 내용2 / 주제3 : 내용3 ..."
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </section>
    );
}

export default AdminWritePage;
