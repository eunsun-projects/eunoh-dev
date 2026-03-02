"use client";

import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getPokemons } from "../_apis/client";
import type { PokemonWithSpecies } from "../_types/pokedex.type";
import PokemonCard from "./pokedex-card";
import PokedexInfiniteScroll from "./pokedex-infinite-scroll";
import PokedexLoader from "./pokedex-loader";

function AllPokemons() {
	const {
		data: pokemons = [],
		isFetching,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: ["pokemons"],
		initialPageParam: 1,
		getNextPageParam: (
			lastPage: PokemonWithSpecies[],
			allPages: PokemonWithSpecies[][],
		) => (lastPage.length === 0 ? null : allPages.length + 1),
		queryFn: ({ pageParam }: { pageParam: number }) => getPokemons(pageParam),
		select: (data: InfiniteData<PokemonWithSpecies[]>) => data.pages.flat(),
		staleTime: Number.POSITIVE_INFINITY,
	});

	// console.log(pokemons);

	return (
		<PokedexInfiniteScroll
			fetchNextPage={fetchNextPage}
			hasNextPage={hasNextPage}
		>
			<div className="relative h-auto w-full bg-white px-12">
				<h1 className="relative py-11 text-center font-bold text-4xl">
					포켓몬 도감
				</h1>
				<ul className="relative mx-auto grid w-full max-w-[90svw] grid-cols-1 place-items-center gap-4 md:max-w-[80svw] md:grid-cols-2 md:gap-12 lg:grid-cols-3 xl:grid-cols-4">
					{pokemons.map((pokemon) => (
						<PokemonCard key={pokemon.id} pokemon={pokemon} />
					))}
				</ul>
				{isFetching && <PokedexLoader isSmall />}
			</div>
		</PokedexInfiniteScroll>
	);
}

export default AllPokemons;
