import { useEffect, Fragment } from 'react';
import { ScrollRestoration, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useMovies } from '@/hooks/use-movies';
import { Skeleton } from '@/components/ui/Skeleton';
import MoviePreviewCard from '@/components/ui/MoviePreviewCard';

const CategoryPage = () => {
  const { category } = useParams();
  const {
    useInfiniteNowPlayingMovies,
    useInfinitePopularMovies,
    useInfiniteTopRatedMovies,
    useInfiniteUpcomingMovies,
  } = useMovies();

  const getCategoryHook = () => {
    switch (category) {
      case 'now-playing':
        return useInfiniteNowPlayingMovies;
      case 'popular':
        return useInfinitePopularMovies;
      case 'top-rated':
        return useInfiniteTopRatedMovies;
      case 'upcoming':
        return useInfiniteUpcomingMovies;
      default:
        return useInfinitePopularMovies;
    }
  };

  const categoryHook = getCategoryHook();
  const { data, isLoading, fetchNextPage, hasNextPage } = categoryHook();

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl md:text-4xl font-bold mb-12 capitalize">
        {category.replace('-', ' ')}
      </h2>
      {isLoading ? (
        <div className="grid grid-cols-auto-fit-200 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} className="w-full aspect-[2/3]" />
          ))}
        </div>
      ) : (
        <ul className="grid grid-cols-auto-fit-200 gap-6">
          {data.pages.map((page, pageIndex) => (
            <Fragment key={pageIndex}>
              {page.results.map((movie) => (
                <li key={movie.id} className="grid">
                  <MoviePreviewCard movie={movie} />
                </li>
              ))}
            </Fragment>
          ))}
        </ul>
      )}
      {isLoading && (
        <div className="grid grid-cols-auto-fit-200 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} className="w-full aspect-[2/3]" />
          ))}
        </div>
      )}
      <div ref={ref} />

      <ScrollRestoration />
    </div>
  );
};

export default CategoryPage;
