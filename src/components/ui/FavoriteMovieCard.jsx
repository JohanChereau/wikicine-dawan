import { Link } from 'react-router-dom';
import FavoriteHeart from './FavoriteHeart';

const FavoriteMovieCard = ({
  movieId,
  moviePoster,
  movieTitle,
  isFavorite = true,
  toggleFavorite = () => {},
  displayButton = true,
}) => {
  return (
    <div className="group grid grid-rows-subgrid row-span-3 gap-3 content-between cursor-pointer select-none max-w-52 mx-auto relative">
      <Link to={`/movie/details/${movieId}`} className="block">
        <img
          className="aspect-[2/3] object-cover rounded-md block h-full group-hover:scale-105 transition-transform duration-150 ease-in-out"
          src={
            moviePoster ||
            `https://placehold.co/400x600/FACC15/black?text=Wikicin%C3%A9`
          }
          alt={`${movieTitle || 'Unknown title'}'s poster`}
        />
      </Link>

      <div className="flex justify-between items-center gap-4">
        <h4 className="text-base sm:text-xl font-bold">
          {movieTitle || 'Unknown title'}
        </h4>
        {displayButton === true ? (
          <FavoriteHeart isFavorite={isFavorite} onClick={toggleFavorite} />
        ) : null}
      </div>
    </div>
  );
};

export default FavoriteMovieCard;
