"use client";

import { useSajuImageMutation } from "@/hooks/queries/tests/useSajuImageMutation";
import { useSajuMutation } from "@/hooks/queries/tests/useSajuMutation";
import type { SajuMessage } from "@/types/tests.type";
import Image from "next/image";
import { useState } from "react";

// const imageMutationResult = await mutateImage({ name: formData.name });
// if (imageMutationResult.imageUrl) {
//   setImageUrl(imageMutationResult.imageUrl);
// }

function SajuTemplate() {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [sajuResult, setSajuResult] = useState<SajuMessage | null>(null);

  const [elapsedTime, setElapsedTime] = useState(0);

  const {
    mutateAsync: postSaju,
    isPending: isPendingSaju,
    error: sajuError,
  } = useSajuMutation();
  const {
    mutateAsync: mutateImage,
    isPending: isPendingImage,
    error: imageError,
  } = useSajuImageMutation();

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const start = performance.now();
    // 사주 Mutation 요청
    const sajuPromise = postSaju({ name, birth })
      .then((sajuData) => {
        // 사주 결과 먼저 표시
        setSajuResult(sajuData.message as SajuMessage);
      })
      .catch((error) => {
        console.error("Saju Error:", error);
      });

    // 이미지 Mutation 요청
    const imagePromise = mutateImage({ name })
      .then((imageData) => {
        // 이미지가 준비되면 표시
        if (imageData?.imageUrl) {
          setImageUrl(imageData.imageUrl);
        }
      })
      .catch((error) => {
        console.error("Image Error:", error);
      });

    // 둘 다 끝난 시점을 구하고 싶으면 Promise.all 사용
    Promise.all([sajuPromise, imagePromise])
      .then(() => {
        const end = performance.now();
        setElapsedTime(end - start);
      })
      .finally(() => {
        // 로딩상태 해제 등 처리
      });
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded-md"
        />
        <input
          type="date"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          className="border p-2 rounded-md mt-2"
        />
        <button
          type="submit"
          disabled={isPendingSaju || isPendingImage}
          className="bg-blue-500 text-white p-2 rounded-md mt-2"
        >
          제출
        </button>
      </form>
      {sajuError || imageError ? (
        <div className="text-red-500">error</div>
      ) : null}
      {isPendingSaju && (
        <div className="text-red-500 animate-pulse">Saju Loading...</div>
      )}
      <div className="mt-4 w-[70%]">
        {sajuResult && (
          <div className="text-sm text-gray-500 w-full">
            <div>사주해석: {sajuResult.사주해석}</div>
            <div>운세: {sajuResult.운세}</div>
            <div>권고사항: {sajuResult.권고사항}</div>
            <div>번영을 위한 조언: {sajuResult["번영을 위한 조언"]}</div>
          </div>
        )}
      </div>
      {isPendingImage && (
        <div className="text-red-500 animate-pulse">ImageLoading...</div>
      )}
      {imageUrl && (
        <div className="w-1/2 h-1/2 relative overflow-hidden min-h-[512px]">
          <Image
            // src={`/api/tests/saju/image/proxy?url=${encodeURIComponent(imageUrl)}`}
            src={imageUrl}
            alt="Generated image"
            sizes="100vw"
            fill
            className="object-cover h-full w-full"
          />
        </div>
      )}{" "}
      <div className="text-sm text-gray-500 w-[70%]">
        {/** 소요시간 초로 변환할것 */}
        <p className="font-bold text-red-500 animate-bounce">
          소요시간: {(elapsedTime / 1000).toFixed(1)}초
        </p>
      </div>
    </div>
  );
}

export default SajuTemplate;

// const {
//   messages,
//   input,
//   setInput,
//   handleInputChange,
//   handleSubmit,
//   error,
//   reload,
//   isLoading,
//   append,
// } = useChat({
//   api: '/api/tests/saju',
// });
// const onSubmit = async (
//   e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>,
// ) => {
//   e.preventDefault();
//   if (!birth || !input) {
//     alert('생년월일과 이름을 입력해주세요.');
//     return;
//   }

//   const stringifiedInput = JSON.stringify({ name: input, birth });
//   await append({ content: stringifiedInput, role: 'user' });
//   handleSubmit(e);
// };
