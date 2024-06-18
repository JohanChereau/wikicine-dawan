import { Button } from '@/components/ui/Button';
import { useWikiMovie } from '@/hooks/use-wiki';
import { Link, useParams } from 'react-router-dom';

const WikiPage = () => {
  const { movieId } = useParams();

  const { getWikiMovie } = useWikiMovie(movieId);
  const { data: wikiData, isLoading } = getWikiMovie;

  console.log(wikiData);

  if (isLoading) return <p>Loading...</p>;

  if (!wikiData) return <p>No wiki found</p>;

  return (
    <article>
      <Button asChild>
        <Link to={`/dashboard/create-wiki/${movieId}`}>Edit</Link>
      </Button>
      <p>{JSON.stringify(wikiData)}</p>
    </article>
  );
};

export default WikiPage;
