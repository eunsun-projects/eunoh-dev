'use client';

import { useEffect } from 'react';

function OverScroll() {
  useEffect(() => {
    document.documentElement.style.overscrollBehavior = 'none';

    // 원래 return 에서 정리했었는데
    // root layout 에 적용되었는데도 불구하고
    // 내부에서 페이지 이동시 auto 로 바뀌는 경우가 있어서
    // 일단 주석처리
    // return () => {
    //   document.documentElement.style.overscrollBehavior = 'auto';
    // };
  }, []);

  return <></>;
}

export default OverScroll;
