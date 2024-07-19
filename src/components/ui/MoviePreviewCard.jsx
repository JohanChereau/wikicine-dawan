import Badge from './Badge';
import { Link } from 'react-router-dom';

const MoviePreviewCard = ({
  movieId,
  moviePoster,
  movieTitle,
  releaseDate,
  rating,
}) => {
  const scaledRating = rating ? ((rating / 10) * 5).toFixed(1) : 'N/A';

  return (
    <Link
      to={`/movies/details/${movieId}`}
      className="group grid grid-rows-subgrid row-span-4 gap-3 content-between cursor-pointer select-none max-w-52 mx-auto"
    >
      <div>
        <img
          className="aspect-[2/3] object-cover rounded-md block h-full group-hover:scale-105 transition-transform duration-150 ease-in-out"
          src={
            moviePoster ||
            'https://placehold.co/400x600/FACC15/black?text=Wikicin%C3%A9'
          }
          alt={`${movieTitle || 'Unknown title'}'s poster`}
        />
      </div>

      <h4 className="text-base sm:text-xl font-bold">
        {movieTitle || 'Unknown title'}
      </h4>

      <p className="text-muted-foreground text-sm sm:text-base">
        {releaseDate || 'Unknown release date'}
      </p>

      <Badge text={scaledRating} iconClassName="text-primary" />
    </Link>
  );
};

export default MoviePreviewCard;
