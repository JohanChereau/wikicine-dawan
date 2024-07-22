import { useMovies } from '@/hooks/use-movies';
import MoviesCarousel from '@/components/ui/MoviesCarousel';
import { Skeleton } from '@/components/ui/Skeleton';

const MoviesSuggestions = () => {
  const {
    useInfinitePopularMovies,
    useInfiniteTopRatedMovies,
    useInfiniteNowPlayingMovies,
    useInfiniteUpcomingMovies,
  } = useMovies();

  const {
    data: popularMoviesData,
    isLoading: popularLoading,
    error: popularError,
  } = useInfinitePopularMovies();

  const {
    data: topRatedMoviesData,
    isLoading: topRatedLoading,
    error: topRatedError,
  } = useInfiniteTopRatedMovies();

  const {
    data: nowPlayingMoviesData,
    isLoading: nowPlayingLoading,
    error: nowPlayingError,
  } = useInfiniteNowPlayingMovies();

  const {
    data: upcomingMoviesData,
    isLoading: upcomingLoading,
    error: upcomingError,
  } = useInfiniteUpcomingMovies();

  const popularMovies = popularMoviesData?.pages[0]?.results || [];
  const topRatedMovies = topRatedMoviesData?.pages[0]?.results || [];
  const nowPlayingMovies = nowPlayingMoviesData?.pages[0]?.results || [];
  const upcomingMovies = upcomingMoviesData?.pages[0]?.results || [];

  return (
    <article className="grid grid-rows-4 gap-16 lg:gap-24">
      <section>
        {popularLoading ? (
          <Skeleton className="w-full h-40" />
        ) : popularError ? (
          <p>Erreur de chargement des films populaires</p>
        ) : (
          <MoviesCarousel
            movies={popularMovies}
            sectionTitle="Popular"
            actionLink="popular"
          />
        )}
      </section>
      <section>
        {topRatedLoading ? (
          <Skeleton className="w-full h-40" />
        ) : topRatedError ? (
          <p>Erreur de chargement des films les mieux notés</p>
        ) : (
          <MoviesCarousel
            movies={topRatedMovies}
            sectionTitle="Top Rated"
            actionLink="top-rated"
          />
        )}
      </section>
      <section>
        {nowPlayingLoading ? (
          <Skeleton className="w-full h-40" />
        ) : nowPlayingError ? (
          <p>Erreur de chargement des films en cours de projection</p>
        ) : (
          <MoviesCarousel
            movies={nowPlayingMovies}
            sectionTitle="Now Playing"
            actionLink="now-playing"
          />
        )}
      </section>
      <section>
        {upcomingLoading ? (
          <Skeleton className="w-full h-40" />
        ) : upcomingError ? (
          <p>Erreur de chargement des films à venir</p>
        ) : (
          <MoviesCarousel
            movies={upcomingMovies}
            sectionTitle="Upcoming"
            actionLink="upcoming"
          />
        )}
      </section>
    </article>
  );
};

export default MoviesSuggestions;
