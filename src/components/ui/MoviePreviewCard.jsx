import Badge from './Badge';
import { Link } from 'react-router-dom';
import { truncateText } from '@/utils/string/truncate';

const placeholderImage =
  'https://placehold.co/400x600/FACC15/black?text=Wikicin%C3%A9';

const MoviePreviewCard = ({ movie }) => {
  const {
    id: movieId,
    poster_path: posterPath,
    title,
    release_date: releaseDate,
    vote_average: voteAverage,
  } = movie || {};

  const moviePoster = posterPath
    ? `https://image.tmdb.org/t/p/original/${posterPath}`
    : placeholderImage;
  const movieTitle = truncateText(title || 'Unknown Title', 32, '...');
  const movieReleaseDate = releaseDate || 'Unknown Date';
  const rating = voteAverage ? Number(voteAverage.toFixed(1)) : 'N/A';
  const scaledRating = rating !== 'N/A' ? ((rating / 10) * 5).toFixed(1) : 'N/A';

  return (
    <Link
      to={`/movies/details/${movieId}`}
      className="group grid grid-rows-subgrid row-span-4 gap-3 content-between cursor-pointer select-none max-w-52 mx-auto"
    >
      <div>
        <img
          className="aspect-[2/3] object-cover rounded-md block h-full group-hover:scale-105 transition-transform duration-150 ease-in-out"
          src={moviePoster}
          alt={`${movieTitle}'s poster`}
        />
      </div>

      <h4 className="text-base sm:text-xl font-bold">{movieTitle}</h4>

      <p className="text-muted-foreground text-sm sm:text-base">
        {movieReleaseDate}
      </p>

      <Badge text={scaledRating} iconClassName="text-primary" />
    </Link>
  );
};

export default MoviePreviewCard;
