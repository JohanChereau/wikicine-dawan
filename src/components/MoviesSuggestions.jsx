import { useMovies } from '@/hooks/use-movies';
import MoviesCarousel from '@/components/ui/MoviesCarousel';
import { Skeleton } from '@/components/ui/Skeleton';

const MoviesSuggestions = () => {
  const { useTrendingMovies, usePopularMovies } = useMovies();

  const { data: trendingMovies, isLoading: trendingLoading } = useTrendingMovies();
  const { data: popularMovies, isLoading: popularLoading } = usePopularMovies();

  return (
    <section className="grid grid-rows-2 gap-16 lg:gap-24">
      <div>
        {trendingLoading ? (
          <Skeleton className="w-full h-40" />
        ) : (
          <MoviesCarousel movies={trendingMovies?.results} sectionTitle="Trending" />
        )}
      </div>
      <div>
        {popularLoading ? (
          <Skeleton className="w-full h-40" />
        ) : (
          <MoviesCarousel movies={popularMovies?.results} sectionTitle="Popular" />
        )}
      </div>
    </section>
  );
};

export default MoviesSuggestions;
