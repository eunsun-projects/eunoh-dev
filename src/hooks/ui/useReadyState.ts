import { UiStateContext } from '@/contexts/ready.context';
import { useContext } from 'react';

export const useReadyState = () => {
  const context = useContext(UiStateContext);

  if (context === undefined || context === null) {
    throw new Error('오류 발생! 오류발생! 훅은 프로바이더 안에서 써줘요잉');
  }

  return context;
};
