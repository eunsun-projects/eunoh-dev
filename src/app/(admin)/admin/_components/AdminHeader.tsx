"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import Link from "next/link";

function AdminHeader() {
    const { user, logOut, loginWithProvider } = useAuth();

    return (
        <header className="flex items-center justify-between h-16 px-8">
            <Link href="/admin">
                <p className="text-2xl font-bold">AdminPage</p>
            </Link>
            {user ? (
                <div className="flex items-center gap-2">
                    <span>{`${user.email} 님 반갑습니다!`}</span>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={logOut}>
                        로그아웃
                    </button>
                </div>
            ) : (
                <div className="flex items-center">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={() => loginWithProvider("google")}
                    >
                        구글로그인
                    </button>
                </div>
            )}
        </header>
    );
}

export default AdminHeader;
