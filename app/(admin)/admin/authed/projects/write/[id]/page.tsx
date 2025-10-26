"use client";

import { use, useEffect } from "react";
import { useProjectsQuery } from "@/hooks/queries/projects";
import AdminWritePage from "../../_components/AdminWritePage";

function EditPage({ params }: { params: Promise<{ id: string }> }) {
	const { data, isLoading, error } = useProjectsQuery();
	const { id } = use(params);
	const project = data?.find((project) => project.id === id);

	useEffect(() => {
		if (error) console.error(error.message);
	}, [error]);

	if (isLoading) return <div>Loading...</div>;

	return <AdminWritePage mode="edit" project={project} />;
}

export default EditPage;
