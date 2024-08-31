"use client";

import { useProjectsQuery } from "@/hooks/queries/projects";
import Link from "next/link";
import { useEffect } from "react";

function ListPage() {
    const { data: projects, isLoading, error } = useProjectsQuery();

    useEffect(() => {
        if (error) console.error(error.message);
    }, [error]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">Projects</h2>
            <ul>
                {projects?.map((project) => (
                    <li key={project.id} className="flex flex-row items-center justify-between gap-2">
                        <span>{project.title}</span>
                        <div className="flex items-center gap-2">
                            <span>이동</span>
                            <Link href={`/admin/write/${project.id}`}>
                                <span>수정</span>
                            </Link>
                            <span>삭제</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListPage;
