import { Suspense } from "react";
import Loading from "../loading";
import PokedexAllPrefetch from "./pokedex-all-prefetch";
import PokedexTopButton from "./pokedex-top-button";

function PokedexTemplate() {
	return (
		<Suspense fallback={<Loading />}>
			<PokedexAllPrefetch />
			<PokedexTopButton />
		</Suspense>
	);
}

export default PokedexTemplate;
