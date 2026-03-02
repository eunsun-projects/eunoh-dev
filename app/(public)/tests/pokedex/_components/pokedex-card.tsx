"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { PokemonWithSpecies } from "../_types/pokedex.type";
import styles from "./pokedex.module.css";

interface PokemonCardProps {
	pokemon: PokemonWithSpecies;
}

function PokemonCard({ pokemon }: PokemonCardProps) {
	const liRef = useRef<HTMLLIElement>(null);

	const handleMouseMove = (
		e: React.MouseEvent<HTMLLIElement> | React.MouseEvent<HTMLDivElement>,
	) => {
		const x = e.nativeEvent.offsetX;
		const y = e.nativeEvent.offsetY;
		const rotateY = (-1 / 5) * x + 20;
		const rotateX = (4 / 30) * y - 20;
		const bgPosX = (x / e.currentTarget.clientWidth) * 100;
		const bgPosY = (y / e.currentTarget.clientHeight) * 100;
		e.currentTarget.style.backgroundPosition = `${bgPosX}px center`;
		e.currentTarget.style.zIndex = "100";
		e.currentTarget.style.filter = `opacity(${x / 200}) saturate(${x / 200}) brightness(1.2)`;
		if (liRef.current) {
			liRef.current.style.zIndex = "100";
			liRef.current.style.transform = `perspective(350px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
		}
	};

	const handleMouseLeave = (
		e: React.MouseEvent<HTMLLIElement> | React.MouseEvent<HTMLDivElement>,
	) => {
		e.currentTarget.style.filter = "opacity(0.6) saturate(1) brightness(1.1)";
		e.currentTarget.style.zIndex = "unset";
		if (liRef.current) {
			liRef.current.style.transform =
				"perspective(350px) rotateY(0deg) rotateX(0deg)";
			liRef.current.style.zIndex = "unset";
		}
	};

	return (
		<Link
			href={`/tests/pokedex/${pokemon.id}`}
			className="relative flex items-center justify-center"
		>
			<li
				ref={liRef}
				className="flex h-96 w-[80svw] transform flex-col items-center justify-center gap-4 rounded-lg bg-gray-200 shadow-md transition-all duration-100 duration-400 ease-in-out hover:shadow-lg md:w-[clamp(128px,36svw,320px)]"
			>
				<div
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					className={`filter-brightness-opacity absolute z-10 h-full w-full rounded-lg bg-[position:100%] bg-[size:150%_150%] mix-blend-color-dodge brightness-110 transition-all ${styles.bg_custom_gradient} ${styles.filter_opacity}`}
				/>
				<div className="relative aspect-auto h-52 w-52">
					<Image
						src={pokemon.sprites.other.dream_world.front_default as string}
						alt={pokemon.korean_name || "pokemon_name"}
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
						priority
					/>
				</div>

				<strong className="text-xl">{pokemon.korean_name}</strong>
				<p className="text-sm">{`도감번호 : ${pokemon.id}`}</p>
			</li>
		</Link>
	);
}

export default PokemonCard;
