'use client';

import { useSajuImageMutation } from '@/hooks/queries/tests/useSajuImageMutation';
import { useSajuMutation } from '@/hooks/queries/tests/useSajuMutation';
import { SajuMessage } from '@/types/tests.type';
import { useEffect, useState } from 'react';

// const imageMutationResult = await mutateImage({ name: formData.name });
// if (imageMutationResult.imageUrl) {
//   setImageUrl(imageMutationResult.imageUrl);
// }

function SajuTemplate() {
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sajuResult, setSajuResult] = useState<SajuMessage | null>(null);

  const [elapsedTime, setElapsedTime] = useState(0);

  const { mutateAsync: postSaju, isPending: isPendingSaju, error: sajuError } = useSajuMutation();
  const {
    mutateAsync: mutateImage,
    isPending: isPendingImage,
    error: imageError,
  } = useSajuImageMutation();

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const start = performance.now();
    const result = await postSaju({ name, birth });
    setSajuResult(result.message as SajuMessage);
    const imageResult = await mutateImage({ name });
    if (imageResult.imageUrl) {
      setImageUrl(imageResult.imageUrl);
    }
    const end = performance.now();
    setElapsedTime(end - start);
  };

  useEffect(() => {
    if (isPendingSaju || isPendingImage) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isPendingSaju, isPendingImage]);

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
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 rounded-md mt-2"
        >
          제출
        </button>
      </form>
      {sajuError || imageError ? <div className="text-red-500">error</div> : null}
      {isLoading && <div className="text-red-500 animate-pulse">Loading...</div>}
      <div className="mt-4 w-[70%]">
        {sajuResult && (
          <div className="text-sm text-gray-500 w-full">
            <div>사주해석: {sajuResult['사주해석']}</div>
            <div>운세: {sajuResult['운세']}</div>
            <div>권고사항: {sajuResult['권고사항']}</div>
            <div>번영을 위한 조언: {sajuResult['번영을 위한 조언']}</div>
          </div>
        )}
      </div>
      {isPendingImage && <div className="text-red-500 animate-pulse">Loading...</div>}
      {imageUrl && (
        <img
          src={`/api/tests/saju/image/proxy?url=${encodeURIComponent(imageUrl)}`}
          alt="Generated image"
        />
      )}{' '}
      <div className="text-sm text-gray-500 w-[70%]">
        {/** 소요시간 초로 변환할것 */}
        <div>소요시간: {(elapsedTime / 1000).toFixed(1)}초</div>
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
