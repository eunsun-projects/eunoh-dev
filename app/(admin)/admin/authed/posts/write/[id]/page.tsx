"use client";

import { use, useEffect } from "react";
import { usePostQuery } from "@/hooks/queries/post/usePostQuery";
import PostsWriteTemplate from "../../_components/PostsWriteTemplate";

function EditPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);
	const { data: post, isPending, error } = usePostQuery({ id });

	useEffect(() => {
		if (error) console.error(error.message);
	}, [error]);

	if (isPending) return <div>Loading...</div>;

	return <PostsWriteTemplate mode="edit" post={post} />;
}

export default EditPage;
