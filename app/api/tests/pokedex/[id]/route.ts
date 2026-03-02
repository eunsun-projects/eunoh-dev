import axios from "axios";
import { NextResponse } from "next/server";
import Pokedex from "pokedex-promise-v2";

export const GET = async (
	_request: Request,
	{ params }: { params: Promise<{ id: string }> },
) => {
	const id = (await params).id;

	const pokemons = new Pokedex();
	try {
		const response = await pokemons.getPokemonByName(id);
		const speciesResponse = await pokemons.getPokemonSpeciesByName(id);

		const koreanName = speciesResponse.names?.find(
			(name: Pokedex.Name) => name.language.name === "ko",
		);

		const typesWithKoreanNames = await Promise.all(
			response.types.map(async (type: Pokedex.PokemonType) => {
				const typeResponse = await axios.get<Pokedex.PokemonType>(
					type.type.url,
				);
				const koreanTypeName =
					typeResponse.data.names?.find(
						(name: Pokedex.Name) => name.language.name === "ko",
					)?.name || type.type.name;
				return { ...type, type: { ...type.type, korean_name: koreanTypeName } };
			}),
		);

		const abilitiesWithKoreanNames = await Promise.all(
			response.abilities.map(async (ability: Pokedex.PokemonAbility) => {
				const abilityResponse = await axios.get<Pokedex.PokemonAbility>(
					ability.ability.url,
				);
				const koreanAbilityName =
					abilityResponse.data.names?.find(
						(name: Pokedex.Name) => name.language.name === "ko",
					)?.name || ability.ability.name;
				return {
					...ability,
					ability: { ...ability.ability, korean_name: koreanAbilityName },
				};
			}),
		);

		const movesWithKoreanNames = await Promise.all(
			response.moves.map(async (move: Pokedex.MoveElement) => {
				const moveResponse = await axios.get<Pokedex.MoveElement>(
					move.move.url,
				);
				const koreanMoveName =
					moveResponse.data.names?.find(
						(name: Pokedex.Name) => name.language.name === "ko",
					)?.name || move.move.name;
				return { ...move, move: { ...move.move, korean_name: koreanMoveName } };
			}),
		);

		const pokemonData = {
			...response,
			korean_name: koreanName?.name || response.name,
			types: typesWithKoreanNames,
			abilities: abilitiesWithKoreanNames,
			moves: movesWithKoreanNames,
		};

		return NextResponse.json(pokemonData);
	} catch (error) {
		const httpError = error as Error;
		return NextResponse.json({
			error: "데이터를 가져오는 데 실패했습니다.",
			details: httpError.message,
		});
	}
};
