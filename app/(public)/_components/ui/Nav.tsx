import cn from '@/utils/common/cn';
import Link from 'next/link';

const NAV_ITEMS = [
  {
    title: 'skills',
    href: '/skills',
    description: '- 기술 스택',
  },
  {
    title: 'projects',
    href: '/projects',
    description: '- 진행한 프로젝트',
  },
  {
    title: 'posts',
    href: '/posts',
    description: '- 탐구와 기록',
  },
  {
    title: 'tests',
    href: '/tests',
    description: '- 여러가지 테스트들',
  },
  {
    title: 'as-an-artist',
    href: '/as-an-artist',
    description: '- 예술가로서',
  },
];

interface NavProps {
  ready: boolean;
}

function Nav({ ready }: NavProps) {
  return (
    <section
      className={cn(
        'opacity-0 w-full flex items-center justify-between my-6 xl:my-14 transition-all duration-1000',
        ready && 'opacity-100',
      )}
    >
      <div className="flex flex-col gap-0.5 xl:gap-1 text-sm xl:text-base">
        {NAV_ITEMS.map((item) => (
          <div key={item.title} className="flex flex-row gap-2 items-center">
            <Link
              href={item.href}
              className="p-0.5 dark:hover:bg-neutral-500 hover:bg-neutral-300 hover:rounded-sm transition-all duration-200 text-neutral-900 dark:text-neutral-200"
            >
              {item.title}
            </Link>
            <span className="text-xs xl:text-sm">{item.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Nav;
