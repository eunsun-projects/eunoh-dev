import clsx from "clsx";
import Image from "next/image";

type PokedexLoaderProps = {
	isSmall?: boolean;
};

function PokedexLoader({ isSmall = false }: PokedexLoaderProps) {
	return (
		<div className={clsx("relative w-full", isSmall ? "h-[50vh]" : "h-dvh")}>
			<div className="relative top-[50%] left-[50%] aspect-square h-[96px] w-[96px] -translate-x-1/2 -translate-y-1/2 transform">
				<Image
					className="object-cover"
					src="/assets/pokedex/charmander.gif"
					alt="charmander"
					fill
					sizes="(min-width: 640px) 96px, 96px"
					priority
					unoptimized
				/>
			</div>
		</div>
	);
}

export default PokedexLoader;
