import Link from "next/link";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function NotFound() {
  return (
    <div className="min-h-full">
      <main className="max-w-[640px] mx-auto pt-[128px] min-h-[calc(100dvh-128px-28px)] flex flex-col gap-4">
        <div className="p-0.5">
          <h2 className="font-bold text-neutral-900 dark:text-neutral-50">
            Not Found
          </h2>
          <p>Could not find requested resource</p>
        </div>
        <div className="relative max-w-fit">
          <Link
            href="/"
            className="text-neutral-900 dark:text-neutral-50 flex flex-row items-center gap-1 p-0.5 dark:hover:bg-neutral-500 hover:bg-neutral-300 hover:rounded-sm transition-all duration-200"
          >
            <span className="text-base">Return Home</span>
            <RiArrowGoBackFill className="text-base cursor-pointer" />
          </Link>
        </div>
      </main>
    </div>
  );
}
