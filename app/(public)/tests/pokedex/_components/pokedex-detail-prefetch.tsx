import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { getPokemon } from "../_apis/server";
import PokedexDetail from "./pokedex-detail";

interface PokedexDetailPrefetchProps {
	id: string;
}

async function PokedexDetailPrefetch({ id }: PokedexDetailPrefetchProps) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["pokemon"],
		queryFn: () => getPokemon(id),
		staleTime: Number.POSITIVE_INFINITY,
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<PokedexDetail id={id} />
		</HydrationBoundary>
	);
}

export default PokedexDetailPrefetch;
