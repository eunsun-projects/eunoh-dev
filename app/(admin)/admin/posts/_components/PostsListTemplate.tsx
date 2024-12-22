import { usePostMutation, usePostsQuery } from '@/hooks/queries/posts';
import { Post } from '@/types/post.types';
import cn from '@/utils/common/cn';
import Link from 'next/link';

function PostsListTemplate() {
  const { data: posts, isPending, error } = usePostsQuery();
  const { mutate, isPending: mutationPending, error: mutationError } = usePostMutation();

  const handleDelete = (post: Post) => {
    const newPost = {
      ...post,
      isView: false,
    };

    mutate(newPost);
  };

  if (isPending || mutationPending) return <div>Pending...</div>;

  return (
    <div className="flex flex-col gap-3 px-8">
      <h2 className="text-2xl font-bold">Posts</h2>
      <ul>
        {posts?.map((post) => (
          <li
            key={post.id}
            className={cn(
              'flex flex-row items-center justify-between gap-2',
              post.isView ? 'bg-white' : 'bg-gray-100 text-gray-400',
            )}
          >
            <span>{post.title}</span>
            <div className="flex items-center gap-2">
              <span>이동</span>
              <Link href={`/admin/posts/write/${post.id}`}>
                <span>수정</span>
              </Link>
              <span className="cursor-pointer" onClick={() => handleDelete(post)}>
                삭제
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsListTemplate;
