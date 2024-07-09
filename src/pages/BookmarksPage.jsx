import { useState, useEffect } from 'react';
import { useAuth } from '@/services/providers/auth-provider';
import { useFavorites } from '@/hooks/use-favorites.js';
import BackgroundMesh from '@/components/ui/BackgroundMesh';
import { Skeleton } from '@/components/ui/Skeleton';
import FavoriteMovieCard from '@/components/ui/FavoriteMovieCard';
import { useToast } from '@/hooks/use-toast';
import {
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  Select,
  SelectItem,
  SelectLabel,
} from '@/components/ui/Select';

const BookmarksPage = () => {
  const { session, isLoading: authLoading, error: authError } = useAuth();
  const userId = session?.user?.id;
  const { getFavorites, removeFavorite } = useFavorites(userId);
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState('latest');
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  useEffect(() => {
    if (!getFavorites.isLoading && getFavorites.data) {
      const sortedFavorites = [...getFavorites.data].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return sortBy === 'latest' ? dateB - dateA : dateA - dateB;
      });
      setFilteredFavorites(sortedFavorites);
    }
  }, [getFavorites.data, getFavorites.isLoading, sortBy]);

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleRemoveMovie = async (movieId) => {
    try {
      await removeFavorite(movieId);
      toast({
        title: 'Movie removed',
        description: 'The movie has been removed from your favorites.',
        status: 'success',
      });
    } catch (error) {
      console.error('Error removing movie:', error.message);
      toast({
        title: 'Error removing movie',
        description: error.message || 'An unknown error occurred',
        status: 'error',
      });
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

  if (!getFavorites?.data?.length) {
    return (
      <section className="py-20 grid grid-flow-row gap-6 place-items-center w-full">
        <div className="text-center relative">
          <BackgroundMesh />
          <h1 className="text-4xl md:text-6xl font-bold">Bookmarks</h1>
          <p className="text-xl md:text-2xl mt-6">No favorites found.</p>
        </div>
      </section>
    );
  }

  return (
    <article className="grid gap-12">
      <h1 className="text-4xl md:text-6xl font-bold text-center my-12">Bookmarks</h1>

      <section>
        <div className="grid grid-cols-2 gap-4 mt-6 mb-8">
          <Select
            value={sortBy}
            onValueChange={handleSortChange}
            disabled={filteredFavorites && filteredFavorites.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder="Latest added" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sorting favorites</SelectLabel>
                <SelectItem value="latest">Latest added</SelectItem>
                <SelectItem value="oldest">Oldest added</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <ul
          className={`grid ${
            filteredFavorites?.length > 4
              ? `grid-cols-auto-fit-200`
              : `grid-cols-1 sm:grid-cols-2 md:grid-cols-4`
          } gap-6`}
        >
          {filteredFavorites.map((favorite) => (
            <li key={favorite.movie_id} className="grid">
              <FavoriteMovieCard
                movieId={favorite?.movie_id}
                moviePoster={favorite?.poster_url}
                movieTitle={favorite?.title}
                isFavorite={true}
                toggleFavorite={() => handleRemoveMovie(favorite?.movie_id)}
              />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default BookmarksPage;
