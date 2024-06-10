import Badge from './Badge';
import { Link } from 'react-router-dom';

const MoviePreviewCard = ({
  movieId,
  moviePoster,
  movieTitle,
  releaseDate,
  rating,
}) => {
  const scaledRating = ((rating / 10) * 5).toFixed(1);

  return (
    <Link
      to={`/movie/details/${movieId}`}
      className="group grid grid-rows-subgrid row-span-4 gap-2 content-between cursor-pointer select-none"
    >
      <div>
        <img
          className="aspect-[2/3] object-cover image rounded-md block h-full group-hover:scale-105"
          src={moviePoster}
          alt={`${movieTitle}'s poster`}
        />
      </div>

      <h4 className="text-base sm:text-xl font-bold">{movieTitle}</h4>

      <p className="text-muted-foreground text-sm sm:text-base">{releaseDate}</p>

      <Badge text={scaledRating} iconClassName="text-primary" />
    </Link>
  );
};

export default MoviePreviewCard;
