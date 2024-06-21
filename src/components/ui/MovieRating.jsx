import { FaStar } from 'react-icons/fa';

const MovieRating = ({
  rating = 0,
  voteCount = 0,
  className = '',
  color = 'text-primary',
  starCount = 5,
  showVoteCount = true,
  ratingScale = 10,
}) => {
  const scaledRating = (rating / ratingScale) * starCount;
  const fullStars = Math.round(scaledRating);
  const emptyStars = starCount - fullStars;

  return (
    <div className={`flex items-center gap-2 justify-center ${className}`}>
      <div className="flex items-center pb-1">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className={`w-5 h-5 ${color}`} />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} className="w-5 h-5 text-muted-foreground" />
        ))}
      </div>
      <p className="text-base text-muted-foreground">
        {scaledRating.toFixed(1)} / {starCount}
        {showVoteCount && ` (${voteCount})`}{' '}
      </p>
    </div>
  );
};

export default MovieRating;
