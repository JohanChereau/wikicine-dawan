import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import Badge from './Badge';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import MovieRating from './MovieRating';
import FavoriteHeart from './FavoriteHeart';
import { useFavorites } from '@/hooks/use-favorites';
import { useAuth } from '@/services/providers/auth-provider';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const MovieHeader = ({ movieData }) => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const userId = session?.user?.id;
  const { getFavorites, addFavorite, removeFavorite } = useFavorites(userId);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (getFavorites.data) {
      const favorite = getFavorites.data.find(
        (movie) => movie.movie_id === movieData.id
      );
      setIsFavorite(!!favorite);
    }
  }, [getFavorites.data, movieData.id]);

  const handleGoToPreviousPage = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleToggleFavorite = async () => {
    if (!session) return;

    try {
      if (isFavorite) {
        await removeFavorite(movieData?.id);
      } else {
        const newFavorite = {
          movie_id: movieData?.id,
          title: movieData?.title,
          poster_url: `https://image.tmdb.org/t/p/original${movieData?.poster_path}`,
        };
        await addFavorite(newFavorite);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error?.message);
      toast({
        title: 'Error toggling favorite',
        description: error?.message || 'An unknown error occurred',
        status: 'error',
      });
    }
  };

  const {
    backdrop_path: backdropPath,
    title = 'Title not available',
    release_date: releaseDate = 'Date not available',
    production_companies: productionCompanies = [],
    vote_average: voteAverage = 0,
    vote_count: voteCount = 0,
    genres = [],
  } = movieData || {};

  const backdropUrl = backdropPath
    ? `https://image.tmdb.org/t/p/original${backdropPath}`
    : '';

  return (
    <header
      className={`grid grid-rows-[auto_3fr] gap-2 min-h-64 text-center bg-no-repeat bg-top bg-cover rounded-md`}
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      <div className="flex justify-between items-center gap-6 p-6">
        <Button className="shadow-lg text-white" variant="iconDark" asChild>
          <Link to=".." onClick={handleGoToPreviousPage}>
            <ArrowLeftIcon />
          </Link>
        </Button>
        <div className="flex items-center gap-4">
          <Button className="shadow-lg" asChild>
            <Link to={`/movie/wiki/${movieData?.id}`}>Wiki</Link>
          </Button>
          {session && (
            <FavoriteHeart isFavorite={isFavorite} onClick={handleToggleFavorite} />
          )}
        </div>
      </div>

      <div className="grid gap-3 self-end translate-y-2 pt-20 pb-6 dark:pb-0 bg-gradient-to-t from-black dark:from-background to-transparent rounded-b-md">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white">{title}</h2>
        <p className="text-zinc-300 text-base md:text-lg">
          {releaseDate} ·{' '}
          {productionCompanies[0]?.name || 'Production company not available'}
        </p>

        <MovieRating rating={voteAverage} voteCount={voteCount} />

        <div className="flex justify-center items-center gap-4 flex-wrap">
          {genres.length > 0 ? (
            genres.map((genre) => (
              <Badge
                key={genre.id}
                text={genre.name}
                textClassName="text-white"
                displayIcon={false}
              />
            ))
          ) : (
            <Badge
              text="No genres available"
              textClassName="text-white"
              displayIcon={false}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default MovieHeader;
