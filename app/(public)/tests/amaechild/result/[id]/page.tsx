import IffyResultTemplate from "../../_components/iffy-result-template";

interface EachResultPageProps {
	params: Promise<{ id: string }>;
}

async function IffyResultPage({ params }: EachResultPageProps) {
	const { id } = await params;
	return <IffyResultTemplate id={id} />;
}

export default IffyResultPage;
