import axios from "axios";
import type { PokemonWithSpecies } from "../_types/pokedex.type";

export const getPokemons = async (page: number) => {
	const response = await axios.get<PokemonWithSpecies[]>(
		`/api/tests/pokedex?page=${page}`,
	);
	return response.data;
};

export const getPokemon = async (id: string) => {
	const response = await axios.get<PokemonWithSpecies>(
		`/api/tests/pokedex/${id}`,
	);
	return response.data;
};
