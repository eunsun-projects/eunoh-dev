"use client";

function CalculatorHeader() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h1 className="text-2xl font-bold text-neutral-50">
        써보고 알려준다!! API 가격 계산기!!
      </h1>
      <h2 className="text-sm text-gray-400">
        모델별, API별 실제 사용량을 계산 해준다. 모의 계산 아님. 진짜 API
        호출함. 돈은 내가 냄.
      </h2>
    </div>
  );
}

export default CalculatorHeader;
