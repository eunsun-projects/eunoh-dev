"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import { usePostMutation } from "@/hooks/queries/posts";
import type { PartialPost } from "@/types/post.types";
import cn from "@/utils/common/cn";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import PostsEditor from "./PostsEditor";
const inputStyle = "w-[180px] border border-gray-300 rounded-md p-2";

type FormValues = {
  title?: string;
  category?: string;
  keywords1?: string;
  keywords2?: string;
  keywords3?: string;
  isView?: boolean;
  engTitle?: string;
  summary?: string;
  posted_at?: string;
};

interface PostsWriteTemplateProps {
  mode?: "write" | "edit";
  post?: PartialPost;
}

function PostsWriteTemplate({ mode = "write", post }: PostsWriteTemplateProps) {
  const { user } = useAuth();
  const [markdown, setMarkdown] = useState(
    post?.markdown || "**Hello world!!!**",
  );
  const { register, handleSubmit } = useForm<FormValues>();
  const {
    mutate,
    isPending: mutationPending,
    error: mutationError,
  } = usePostMutation();
  const router = useRouter();

  const titleId = useId();
  const categoryId = useId();
  const keywordsId = useId();
  const isViewId = useId();
  const engTitleId = useId();
  const summaryId = useId();
  const posted_atId = useId();

  const handleChange = useCallback((value: string | undefined) => {
    setMarkdown(value || "");
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newPost: PartialPost = {
      title: mode === "edit" && !data.title ? post?.title : data.title,
      markdown: mode === "edit" && !post?.markdown ? post?.markdown : markdown,
      isView:
        mode === "edit" && data.isView === undefined
          ? post?.isView
          : data.isView,
      category:
        mode === "edit" && !data.category ? post?.category : data.category,
      keywords:
        mode === "edit" && !data.keywords1 && !data.keywords2 && !data.keywords3
          ? post?.keywords
          : ([data.keywords1, data.keywords2, data.keywords3].filter(
              Boolean,
            ) as string[]),
      engTitle:
        mode === "edit" && !data.engTitle ? post?.engTitle : data.engTitle,
      posted_at:
        mode === "edit" && !data.posted_at ? post?.posted_at : data.posted_at,
      summary: mode === "edit" && !data.summary ? post?.summary : data.summary,
    };

    if (mode === "edit") {
      newPost.id = post?.id;
    }

    console.log(newPost);

    mutate(newPost);
    router.push("/admin/posts");
  };

  useEffect(() => {
    if (mutationError) console.error(mutationError.message);
  }, [mutationError]);

  if (!user) {
    return <div>로그인 후 이용해주세요.</div>;
  }

  return (
    <>
      {mutationPending && (
        <div className="flex justify-center items-center w-full h-full bg-black/50 text-white fixed top-0 left-0 px-8">
          로딩중...
        </div>
      )}
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-2 items-center">
          <label htmlFor={isViewId}>노출여부</label>
          <input
            type="checkbox"
            className={inputStyle}
            id={isViewId}
            {...register("isView")}
            defaultChecked={mode === "edit" ? post?.isView || false : false}
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label htmlFor={posted_atId}>작성일</label>
          <input
            type="date"
            className={inputStyle}
            id={posted_atId}
            defaultValue={
              mode === "edit"
                ? format(new Date(post?.posted_at as string), "yyyy-MM-dd")
                : ""
            }
            {...register("posted_at")}
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label htmlFor={titleId}>타이틀</label>
          <input
            type="text"
            className={cn(inputStyle, "w-[300px]")}
            id={titleId}
            defaultValue={mode === "edit" ? post?.title || "" : ""}
            {...register("title")}
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label htmlFor={engTitleId}>영어타이틀</label>
          <input
            type="text"
            className={cn(inputStyle, "w-[300px]")}
            id={engTitleId}
            defaultValue={mode === "edit" ? post?.engTitle || "" : ""}
            {...register("engTitle")}
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label htmlFor={summaryId}>요약</label>
          <input
            type="text"
            className={cn(inputStyle, "w-[700px]")}
            id={summaryId}
            defaultValue={mode === "edit" ? post?.summary || "" : ""}
            {...register("summary")}
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label htmlFor={categoryId}>카테고리</label>
          <input
            type="text"
            className={inputStyle}
            id={categoryId}
            defaultValue={mode === "edit" ? post?.category || "" : ""}
            {...register("category")}
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label htmlFor={keywordsId}>키워드</label>
          <input
            type="text"
            className={cn(inputStyle, "w-[120px]")}
            id={keywordsId}
            defaultValue={mode === "edit" ? post?.keywords?.[0] || "" : ""}
            {...register("keywords1")}
          />
          <input
            type="text"
            className={cn(inputStyle, "w-[120px]")}
            id={keywordsId}
            defaultValue={mode === "edit" ? post?.keywords?.[1] || "" : ""}
            {...register("keywords2")}
          />
          <input
            type="text"
            className={cn(inputStyle, "w-[120px]")}
            id={keywordsId}
            defaultValue={mode === "edit" ? post?.keywords?.[2] || "" : ""}
            {...register("keywords3")}
          />
        </div>
        <PostsEditor value={markdown} onChange={handleChange} />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          저장
        </button>
      </form>
    </>
  );
}

export default PostsWriteTemplate;
