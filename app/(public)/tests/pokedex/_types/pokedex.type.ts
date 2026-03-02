import type Pokedex from "pokedex-promise-v2";

export type Pokemon = Pokedex.Pokemon;
export type PokemonSpecies = Pokedex.PokemonSpecies;
export type PokemonWithSpecies = Pokemon & PokemonSpecies;
export type PokemonType = Pokedex.PokemonType;
export type PokemonAbility = Pokedex.PokemonAbility;
export type PokemonMove = Pokedex.MoveElement;
export type PokemonStat = Pokedex.Stat;
