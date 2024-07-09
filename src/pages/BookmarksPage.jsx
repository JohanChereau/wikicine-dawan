import { useAuth } from '@/services/providers/auth-provider';
import { useFavorites } from '@/hooks/use-favorites.js';
import BackgroundMesh from '@/components/ui/BackgroundMesh';
import { Skeleton } from '@/components/ui/Skeleton';
import FavoriteMovieCard from '@/components/ui/FavoriteMovieCard';

const BookmarksPage = () => {
  const { session, isLoading: authLoading, error: authError } = useAuth();
  const userId = session?.user?.id;
  const { getFavorites, removeFavorite } = useFavorites(userId);

  const handleRemoveMovie = async (movieId) => {
    try {
      await removeFavorite(movieId);
    } catch (error) {
      console.error('Error removing movie:', error.message);
    }
  };

  if (authLoading || getFavorites.isLoading) {
    return (
      <section className="py-20 grid grid-flow-row gap-6 place-items-center w-full">
        <div className="text-center relative">
          <BackgroundMesh />
          <h1 className="text-4xl md:text-6xl font-bold">Bookmarks</h1>
        </div>
        <ul className="grid grid-flow-col grid-cols-auto-fit-200 gap-4">
          <Skeleton className="w-full aspect-[2/3]" />
          <Skeleton className="w-full aspect-[2/3]" />
          <Skeleton className="w-full aspect-[2/3]" />
          <Skeleton className="w-full aspect-[2/3]" />
        </ul>
      </section>
    );
  }

  if (authError || getFavorites.error) {
    return (
      <section className="py-20 grid grid-flow-row gap-6 place-items-center w-full">
        <div className="text-center relative">
          <BackgroundMesh />
          <h1 className="text-4xl md:text-6xl font-bold">Bookmarks</h1>
        </div>
        <div>
          Error: {authError?.message || getFavorites.error?.message || 'Error'}
        </div>
      </section>
    );
  }

  if (!getFavorites?.data?.length)
    return (
      <section className="py-20 grid grid-flow-row gap-6 place-items-center w-full">
        <div className="text-center relative">
          <BackgroundMesh />
          <h1 className="text-4xl md:text-6xl font-bold">Bookmarks</h1>
          <p className="text-xl md:text-2xl mt-6">No favorites found.</p>
        </div>
      </section>
    );

  return (
    <article className="grid gap-12">
      <h1 className="text-4xl md:text-6xl font-bold text-center my-12">Bookmarks</h1>

      <section>
        <ul
          className={`grid ${
            getFavorites?.data?.length > 4
              ? `grid-cols-auto-fit-200`
              : `grid-cols-1 sm:grid-cols-2 md:grid-cols-4`
          } gap-6`}
        >
          {getFavorites.data?.map((movie) => (
            <li key={movie.movie_id} className="grid">
              <FavoriteMovieCard
                movieId={movie?.movie_id}
                moviePoster={movie?.poster_url}
                movieTitle={movie?.title}
                removeMovie={handleRemoveMovie}
              />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default BookmarksPage;
