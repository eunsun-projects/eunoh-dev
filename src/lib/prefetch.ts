import type { SupabaseClient } from "@supabase/supabase-js";
import type { QueryClient } from "@tanstack/react-query";
import {
	QUERY_KEY_POSTS,
	QUERY_KEY_PROJECTS,
	QUERY_KEY_TIME_CAPSULES,
	QUERY_KEY_USER,
} from "@/constants/query.constants";
import { getPosts, getProjects, getTimeCapsules, getUser } from "./crud";

export async function prefetchProjects(
	supabase: SupabaseClient,
	queryClient: QueryClient,
) {
	await queryClient.prefetchQuery({
		queryKey: [QUERY_KEY_PROJECTS],
		queryFn: () => getProjects(supabase),
	});
}

export async function prefetchPosts(
	supabase: SupabaseClient,
	queryClient: QueryClient,
) {
	await queryClient.prefetchQuery({
		queryKey: [QUERY_KEY_POSTS],
		queryFn: () => getPosts(supabase),
	});
}

export async function prefetchUser(
	supabase: SupabaseClient,
	queryClient: QueryClient,
) {
	await queryClient.prefetchQuery({
		queryKey: [QUERY_KEY_USER],
		queryFn: () => getUser(supabase),
	});
}

export async function prefetchTimeCapsules(
	supabase: SupabaseClient,
	queryClient: QueryClient,
) {
	await queryClient.prefetchQuery({
		queryKey: [QUERY_KEY_TIME_CAPSULES],
		queryFn: () => getTimeCapsules(supabase),
	});
}

export async function prefetchAll(
	supabase: SupabaseClient,
	queryClient: QueryClient,
) {
	await prefetchUser(supabase, queryClient);
	await prefetchProjects(supabase, queryClient);
	await prefetchPosts(supabase, queryClient);
}
