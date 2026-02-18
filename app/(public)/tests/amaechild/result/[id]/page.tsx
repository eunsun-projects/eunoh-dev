import SharedResultTemplate from "../../_components/shared-result-template";

interface EachResultPageProps {
	params: Promise<{ id: string }>;
}

async function IffyResultPage({ params }: EachResultPageProps) {
	const { id } = await params;
	return <SharedResultTemplate id={id} />;
}

export default IffyResultPage;
