import { useState, useEffect } from 'react';
import { useFavorites } from '@/hooks/use-favorites.js';
import { Skeleton } from '@/components/ui/Skeleton';
import FavoriteMovieCard from '@/components/ui/FavoriteMovieCard';
import {
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  Select,
  SelectItem,
  SelectLabel,
} from '@/components/ui/Select';

const UserProfileFavorites = ({ userId }) => {
  const { getFavorites } = useFavorites(userId);
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

  if (getFavorites.isLoading) {
    return (
      <section className="py-20 grid grid-flow-row gap-6 place-items-center w-full">
        <ul className="grid grid-flow-col grid-cols-auto-fit-200 gap-4">
          <Skeleton className="w-full aspect-[2/3]" />
          <Skeleton className="w-full aspect-[2/3]" />
          <Skeleton className="w-full aspect-[2/3]" />
          <Skeleton className="w-full aspect-[2/3]" />
        </ul>
      </section>
    );
  }

  if (getFavorites.error) {
    return (
      <section className="py-20 grid grid-flow-row gap-6 place-items-center w-full">
        <div>Error: {getFavorites.error.message || 'Error'}</div>
      </section>
    );
  }

  if (!getFavorites?.data?.length) {
    return <p className="text-xl md:text-2xl mt-6">No favorites found.</p>;
  }

  return (
    <section className="grid gap-12">
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
              displayButton={false}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserProfileFavorites;
