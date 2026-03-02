import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { getPokemons } from "../_apis/server";
import type { PokemonWithSpecies } from "../_types/pokedex.type";
import AllPokemons from "./pokedex-all-pokemons";

async function PokedexAllPrefetch() {
	const queryClient = new QueryClient();
	await queryClient.prefetchInfiniteQuery({
		queryKey: ["pokemons"],
		initialPageParam: 1,
		getNextPageParam: (
			lastPage: PokemonWithSpecies[],
			allPages: PokemonWithSpecies[][],
		) => (lastPage.length === 0 ? null : allPages.length),
		queryFn: ({ pageParam }) => getPokemons(pageParam),
		pages: 1,
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<AllPokemons />
		</HydrationBoundary>
	);
}

export default PokedexAllPrefetch;
