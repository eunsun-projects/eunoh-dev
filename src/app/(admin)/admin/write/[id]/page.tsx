"use client";

import { useProjectsQuery } from "@/hooks/queries/projects";
import { useEffect } from "react";
import AdminWritePage from "../../_components/AdminWritePage";

function EditPage({ params }: { params: { id: string } }) {
    const { data, isLoading, error } = useProjectsQuery();
    const project = data?.find((project) => project.id === params.id);

    useEffect(() => {
        if (error) console.error(error.message);
    }, [error]);

    if (isLoading) return <div>Loading...</div>;

    return <AdminWritePage mode="edit" project={project} />;
}

export default EditPage;
