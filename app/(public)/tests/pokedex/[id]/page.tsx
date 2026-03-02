import { Suspense } from "react";
import PokedexDetailPrefetch from "../_components/pokedex-detail-prefetch";
import Loading from "../loading";

interface PokedexDetailPageProps {
	params: Promise<{ id: string }>;
}

async function PokedexDetailPage({ params }: PokedexDetailPageProps) {
	const id = (await params).id;

	return (
		<Suspense fallback={<Loading />}>
			<PokedexDetailPrefetch id={id} />
		</Suspense>
	);
}

export default PokedexDetailPage;
