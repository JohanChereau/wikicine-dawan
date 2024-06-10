import MovieDetailsContent from '@/components/ui/MovieDetailsContent';
import MovieHeader from '@/components/ui/MovieHeader';
import MovieTabs from '@/components/movie-tabs/MovieTabs';
import { Skeleton } from '@/components/ui/Skeleton';
import { useMovies } from '@/hooks/use-movies';
import { ScrollRestoration, useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const { useMovieDetails } = useMovies();
  const { data, isLoading } = useMovieDetails(movieId);

  if (isLoading) {
    return (
      <section className="grid gap-8 max-w-[1000px] mx-auto">
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
      </section>
    );
  }

  return (
    <article className="grid grid-flow-row gap-8 max-w-[1000px] mx-auto">
      <MovieHeader movieData={data} />

      <MovieDetailsContent description={data?.overview} />

      <MovieTabs movieId={data?.id} />

      <ScrollRestoration />
    </article>
  );
};

export default MovieDetailsPage;
