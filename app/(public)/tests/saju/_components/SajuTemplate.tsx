'use client';

import { useSajuMutation } from '@/hooks/queries/tests/useSajuMutation';
import { SajuTestResponse } from '@/types/tests.type';
import { useState } from 'react';

function SajuTemplate() {
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [sajuResult, setSajuResult] = useState<SajuTestResponse | null>(null);
  const { mutateAsync: postSaju, isPending } = useSajuMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await postSaju({ name, birth });
    setSajuResult(result);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          제출
        </button>
      </form>
      {isPending && <div className="text-blue-500">Loading...</div>}
      <div className="mt-4">
        {sajuResult && (
          <>
            <pre className="text-sm text-gray-500">{sajuResult.message}</pre>
            <img src={sajuResult.imageUrl} alt="saju" />
          </>
        )}
      </div>
    </>
  );
}

export default SajuTemplate;
