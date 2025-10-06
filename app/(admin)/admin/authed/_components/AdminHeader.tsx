"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import Link from "next/link";

function AdminHeader() {
  const { user, logOut } = useAuth();

  return (
    <header className="flex items-center justify-between h-16 px-8">
      <Link href="/admin/authed">
        <p className="text-2xl font-bold">AdminPage</p>
      </Link>
      {user?.isAdmin && (
        <div className="flex items-center gap-6">
          <Link href="/admin/authed/projects">
            <span>프로젝트</span>
          </Link>
          <Link href="/admin/authed/posts">
            <span>포스트</span>
          </Link>
        </div>
      )}

      {user && (
        <div className="flex items-center gap-2">
          <span>{`${user.email} 님 반갑습니다!`}</span>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={logOut}
          >
            로그아웃
          </button>
        </div>
      )}
    </header>
  );
}

export default AdminHeader;
