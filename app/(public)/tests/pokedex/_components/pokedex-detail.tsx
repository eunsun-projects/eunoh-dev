"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { getPokemon } from "../_apis/client";
import formatNumber from "../_libs/format-number";
import PokedexAbilitiesChip, {
	type AbilitiesChipVariantsType,
} from "./pokedex-abilities-chip";
import PokedexTypesChip, {
	type TypesChipVariantsType,
} from "./pokedex-types-chip";

interface PokedexDetailProps {
	id: string;
}

function PokedexDetail({ id }: PokedexDetailProps) {
	const { data: pokemon } = useQuery({
		queryKey: ["pokemon"],
		queryFn: () => getPokemon(id),
	});

	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-2 text-black">
			<h1 className="pt-8 font-bold text-4xl">{pokemon?.korean_name}</h1>
			<p>{formatNumber(Number(id))}</p>
			<div className="relative aspect-auto h-56 w-56">
				<Image
					className="object-contain"
					src={pokemon?.sprites.other.dream_world.front_default as string}
					alt={pokemon?.korean_name || "pokemon_name"}
					fill
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
					priority
				/>
			</div>

			<h3 className="py-2 text-3xl">{`이름 : ${pokemon?.korean_name}`}</h3>
			<p>{`키 : ${pokemon?.height ? pokemon.height / 10 : 0} m`}</p>
			<p>{`몸무게 : ${pokemon?.weight ? pokemon.weight / 10 : 0} kg`}</p>
			<div className="flex flex-row gap-2">
				<span>타입 :</span>
				{pokemon?.types.map((type) => (
					<PokedexTypesChip
						key={type.type.name}
						intent={
							type.type.name as unknown as TypesChipVariantsType["intent"]
						}
						label={type.type.korean_name as string}
					/>
				))}
				<span>특성 :</span>
				{pokemon?.abilities.map((ability) => (
					<PokedexAbilitiesChip
						key={ability.ability.name}
						intent={
							ability.ability
								.name as unknown as AbilitiesChipVariantsType["intent"]
						}
						label={ability.ability.korean_name}
					/>
				))}
			</div>
			<p className="py-2 text-2xl">기술 :</p>
			<p className="w-[80%] py-2 text-center">
				{pokemon?.moves.map((move) => (
					<span key={move.move.name}>{move.move.korean_name}&nbsp;&nbsp;</span>
				))}
			</p>
			<Link href="/tests/pokedex">
				<button
					type="button"
					className="cursor-pointer rounded-md bg-red-400 p-1 text-white"
				>
					뒤로가기
				</button>
			</Link>
		</div>
	);
}

export default PokedexDetail;
