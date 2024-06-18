import { useWikiMovie } from '@/hooks/use-wiki';

const CreateWikiPage = () => {
  const { getWikiMovie } = useWikiMovie(222);
  const { data, isLoading } = getWikiMovie;

  console.log(data);

  if (isLoading) return <p>Loading...</p>;

  return <div>{JSON.stringify(data)}</div>;
};

export default CreateWikiPage;
