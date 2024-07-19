import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import MovieRating from '@/components/ui/MovieRating';
import { Skeleton } from '../ui/Skeleton';
import { truncateText } from '@/utils/string/truncate';
import RoleBadge from '../ui/RoleBadge';
import { CalendarDaysIcon, Clapperboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import MarkdownPreview from '../MarkdownPreview';

const UserProfileReview = ({ review }) => {
  if (!review) return <Skeleton className="w-full h-40" />;

  const {
    movie_id,
    movie_title,
    movie_poster,
    rating,
    updated_at,
    comment,
    user_profiles: { role, avatar, username },
  } = review;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <img
            src={`${
              avatar ? avatar : 'https://placehold.co/300x300/FACC15/black?text=User'
            }`}
            alt={`${username || 'Unknown user'}'s avatar`}
            className="aspect-square object-cover rounded-full w-8 md:w-12"
          />
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2">
              <p className="font-semibold text-base md:text-xl">
                {username || 'Unknown user'}
              </p>
              <RoleBadge role={role || 'user'} />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <MovieRating rating={rating} ratingScale={5} showVoteCount={false} />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex gap-4">
        <div className="flex flex-col items-center">
          <Link to={`/movies/details/${movie_id}`}>
            <img
              src={movie_poster}
              alt={`${movie_title} poster`}
              className="h-auto rounded-lg max-w-20 md:max-w-32 hover:scale-105 transition-transform duration-150 ease-in-out"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {role === 'contributor' ? (
            <MarkdownPreview>{truncateText(comment, 600, '...')}</MarkdownPreview>
          ) : (
            <p>{truncateText(comment, 600, '...')}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="w-full flex justify-between flex-wrap gap-4 items-center text-muted-foreground">
        <p className="font-semibold text-gray-500">
          <Link
            to={`/movies/details/${movie_id}`}
            className="inline-flex items-center gap-2 hover:underline"
          >
            <Clapperboard className="max-w-6" />
            <span>{movie_title}</span>
          </Link>
        </p>
        <p className="inline-flex items-center gap-2">
          <CalendarDaysIcon className="max-w-6" />
          <span className="text-gray-500">
            {new Date(updated_at).toLocaleDateString()}
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default UserProfileReview;
