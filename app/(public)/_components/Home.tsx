'use client';

import { useEffect } from 'react';
import Hello from './Hello';

function Home() {
  useEffect(() => {
    document.documentElement.style.overscrollBehavior = 'none';

    return () => {
      document.documentElement.style.overscrollBehavior = 'auto';
    };
  }, []);

  return <Hello />;
}

export default Home;
