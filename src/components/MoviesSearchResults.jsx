import { useMovies } from '@/hooks/use-movies';
import { Skeleton } from './ui/Skeleton';
import Card from './Card';
import { truncateText } from '@/utils/string/truncate';

const MovieSearchResults = ({ query }) => {
  const { useSearchMovies } = useMovies();
  const { data: searchResults, isLoading } = useSearchMovies(query);

  if (isLoading) {
    return (
      <section className="grid grid-cols-auto-fit-200 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="w-full aspect-[2/3]" />
        ))}
      </section>
    );
  }

  if (!searchResults || searchResults.results.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <section className="grid gap-12">
      <h3 className="text-2xl md:text-4xl font-bold">Results for: {query}</h3>

      <ul className="grid grid-cols-auto-fit-200 gap-6">
        {searchResults?.results?.map((movie) => (
          <li key={movie.id} className="grid">
            <Card
              moviePoster={
                movie?.poster_path
                  ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}`
                  : 'https://placehold.co/400x600/FACC15/black?text=Wikicin%C3%A9'
              }
              movieTitle={truncateText(movie.title, 32, '...')}
              releaseDate={movie.release_date}
              rating={Number(movie.vote_average.toFixed(1))}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieSearchResults;
