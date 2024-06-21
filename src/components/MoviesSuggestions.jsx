import { useMovies } from '@/hooks/use-movies';
import MoviesCarousel from '@/components/ui/MoviesCarousel';
import { Skeleton } from '@/components/ui/Skeleton';

const MoviesSuggestions = () => {
  const { useTrendingMovies, usePopularMovies } = useMovies();

  const { data: trendingMovies, isLoading: trendingLoading } = useTrendingMovies();
  const { data: popularMovies, isLoading: popularLoading } = usePopularMovies();

  return (
    <article className="grid grid-rows-2 gap-16 lg:gap-24">
      <section>
        {trendingLoading ? (
          <Skeleton className="w-full h-40" />
        ) : (
          <MoviesCarousel movies={trendingMovies?.results} sectionTitle="Trending" />
        )}
      </section>
      <section>
        {popularLoading ? (
          <Skeleton className="w-full h-40" />
        ) : (
          <MoviesCarousel movies={popularMovies?.results} sectionTitle="Popular" />
        )}
      </section>
    </article>
  );
};

export default MoviesSuggestions;
