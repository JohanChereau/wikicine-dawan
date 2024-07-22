import { useEffect, Fragment } from 'react';
import { useMovies } from '@/hooks/use-movies';
import { Skeleton } from './ui/Skeleton';
import MoviePreviewCard from './ui/MoviePreviewCard';
import { truncateText } from '@/utils/string/truncate';
import { useInView } from 'react-intersection-observer';

const MovieSearchResults = ({ query }) => {
  const { useSearchMovies } = useMovies();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchMovies(query);

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <section className="grid grid-cols-auto-fit-200 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="w-full aspect-[2/3]" />
        ))}
      </section>
    );
  }

  if (!data || data.pages[0].results.length === 0) {
    return <p className="font-bold text-3xl">No results found.</p>;
  }

  return (
    <section className="grid gap-12">
      <h3 className="text-2xl md:text-4xl font-bold">Results for: {query}</h3>

      <ul
        className={`grid ${
          data.pages[0].results.length > 4
            ? `grid-cols-auto-fit-200`
            : `grid-cols-1 sm:grid-cols-2 md:grid-cols-4`
        } gap-6`}
      >
        {data.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.results.map((movie) => (
              <li key={movie.id} className="grid">
                <MoviePreviewCard
                  movieId={movie.id}
                  moviePoster={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                      : 'https://placehold.co/400x600/FACC15/black?text=Wikicin%C3%A9'
                  }
                  movieTitle={truncateText(movie.title, 32, '...')}
                  releaseDate={movie.release_date}
                  rating={Number(movie.vote_average.toFixed(1))}
                />
              </li>
            ))}
          </Fragment>
        ))}
      </ul>

      {isFetchingNextPage && (
        <div className="grid grid-cols-auto-fit-200 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} className="w-full aspect-[2/3]" />
          ))}
        </div>
      )}

      <div ref={ref} />
    </section>
  );
};

export default MovieSearchResults;
