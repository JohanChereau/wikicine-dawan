import { Skeleton } from '@/components/ui/Skeleton';
import { useMovies } from '@/hooks/use-movies';
import MoviePreviewCard from '../ui/MoviePreviewCard';

const MovieDiscoverTab = ({ movieId }) => {
  const { useMovieRecommendations } = useMovies();
  const { data, isLoading } = useMovieRecommendations(movieId);

  if (isLoading) {
    return (
      <ul className="grid grid-cols-auto-fit-200 gap-4">
        {Array(4)
          .fill()
          .map((_, index) => (
            <Skeleton key={index} className="w-full aspect-[2/3]" />
          ))}
      </ul>
    );
  }

  const movies = data?.pages?.[0]?.results;

  if (!movies?.length) {
    return (
      <p>Unfortunately, we don&apos;t have any movies for you to discover 😪</p>
    );
  }

  return (
    <ul className="grid grid-cols-auto-fit-150 sm:grid-cols-auto-fit-200 gap-4">
      {movies.map((movie) => (
        <li key={movie.id}>
          <MoviePreviewCard movie={movie} />
        </li>
      ))}
    </ul>
  );
};

export default MovieDiscoverTab;
