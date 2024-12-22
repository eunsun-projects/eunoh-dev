'use client';

import { useCallback, useState } from 'react';
import PostsEditor from './PostsEditor';

function PostsWriteTemplate() {
  const [value, setValue] = useState('**Hello world!!!**');

  const handleChange = useCallback((value: string | undefined) => {
    setValue(value || '');
  }, []);

  return <PostsEditor value={value} onChange={handleChange} />;
}

export default PostsWriteTemplate;
