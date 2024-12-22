import PublicPostTemplate from '../_components/PublicPostTemplate';

interface PublicPostPageProps {
  params: Promise<{ id: string }>;
}

async function PublicPostPage({ params }: PublicPostPageProps) {
  const id = (await params).id;

  return <PublicPostTemplate id={id} />;
}

export default PublicPostPage;
