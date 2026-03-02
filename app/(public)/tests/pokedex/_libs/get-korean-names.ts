import type { PokemonSpecies } from "../_types/pokedex.type";

export function getKoreanName(pokemon: PokemonSpecies) {
	return pokemon.names.find(
		(name: { language: { name: string }; name: string }) =>
			name.language.name === "ko",
	);
}
