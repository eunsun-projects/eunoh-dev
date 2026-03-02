import { NextResponse } from "next/server";
import Pokedex from "pokedex-promise-v2";
import { TOTAL_POKEMON } from "@/app/(public)/tests/pokedex/_constants/const";
import { getKoreanName } from "@/app/(public)/tests/pokedex/_libs/get-korean-names";
import type { PokemonWithSpecies } from "@/app/(public)/tests/pokedex/_types/pokedex.type";

export const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const pageString = searchParams.get("page");

	const pokemons = new Pokedex();

	if (!pageString) {
		return NextResponse.json({ error: "페이지 번호를 제공해야 합니다." });
	}

	const page = Number(pageString);
	if (Number.isNaN(page) || page < 1) {
		return NextResponse.json({
			error: "유효한 페이지 번호를 제공해야 합니다.",
		});
	}

	const start = (page - 1) * 8 + 1;
	const end = Math.min(start + 7, TOTAL_POKEMON);

	try {
		const pokemonPromises: Promise<PokemonWithSpecies>[] = Array.from(
			{ length: end - start + 1 },
			async (_, idx) => {
				const pokemonId = start + idx;
				const pokemon = await pokemons.getPokemonByName(pokemonId);
				const species = await pokemons.getPokemonSpeciesByName(pokemonId);

				const pokemonWithSpecies = { ...pokemon, ...species };
				const koreanName = getKoreanName(pokemonWithSpecies);

				return { ...pokemonWithSpecies, korean_name: koreanName?.name };
			},
		);

		const allPokemonData = await Promise.all(pokemonPromises);
		return NextResponse.json(allPokemonData);
	} catch (error) {
		const httpError = error as Error;
		return NextResponse.json({
			error: "데이터를 가져오는 데 실패했습니다.",
			details: httpError.message,
		});
	}
};
