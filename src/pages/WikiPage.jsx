import { useWikiMovie } from '@/hooks/use-wiki';
import { useParams } from 'react-router-dom';

const WikiPage = () => {
  const { movieId } = useParams();

  const { getWikiMovie } = useWikiMovie(movieId);
  const { data: wikiData, isLoading } = getWikiMovie;

  console.log(wikiData);

  if (isLoading) return <p>Loading...</p>;

  if (!wikiData) return <p>No wiki found</p>;

  return <div>{JSON.stringify(wikiData)}</div>;
};

export default WikiPage;
