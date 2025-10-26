"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/auth/useAuth";

function AdminHeader() {
	const { user, logOut } = useAuth();

	return (
		<header className="flex h-16 items-center justify-between px-8">
			<Link href="/admin/authed">
				<p className="font-bold text-2xl">AdminPage</p>
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
						className="cursor-pointer rounded-md bg-red-500 px-4 py-2 text-white"
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
