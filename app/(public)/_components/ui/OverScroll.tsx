import { useEffect } from 'react';

function OverScroll() {
  useEffect(() => {
    document.documentElement.style.overscrollBehavior = 'none';

    return () => {
      document.documentElement.style.overscrollBehavior = 'auto';
    };
  }, []);

  return <></>;
}

export default OverScroll;
