import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import MovieRating from '@/components/ui/MovieRating';
import { Skeleton } from '../ui/Skeleton';
import { truncateText } from '@/utils/string/truncate';
import RoleBadge from '../ui/RoleBadge';
import { CalendarDaysIcon, Clapperboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import MarkdownPreview from '../MarkdownPreview';
import { Button } from '../ui/Button';

const UserProfileReview = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedComment = truncateText(comment, 600, '...');

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
      <CardContent className="flex flex-col gap-2">
        {role === 'contributor' ? (
          <MarkdownPreview>
            {isExpanded ? comment : truncatedComment}
          </MarkdownPreview>
        ) : (
          <p>{isExpanded ? comment : truncatedComment}</p>
        )}
        {comment.length > 600 && (
          <Button onClick={handleToggleExpand} className="w-fit p-0" variant="link">
            {isExpanded ? 'Read less' : 'Read more'}
          </Button>
        )}
      </CardContent>
      <CardFooter className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-end flex-wrap gap-4 text-muted-foreground">
        <div className="flex flex-col items-center sm:items-start gap-4 sm:w-auto w-full">
          <Link
            to={`/movies/details/${movie_id}`}
            className="relative overflow-hidden rounded-lg max-w-20 md:max-w-24 group"
          >
            <img
              src={movie_poster}
              alt={`${movie_title} poster`}
              className="transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </Link>
          <p className="font-semibold text-gray-500 text-center sm:text-left">
            <Link
              to={`/movies/details/${movie_id}`}
              className="flex items-center flex-wrap justify-center gap-2 hover:underline break-words"
            >
              <Clapperboard className="max-w-6 text-gray-500 shrink-0" />
              <span className="whitespace-normal break-words">{movie_title}</span>
            </Link>
          </p>
        </div>
        <p className="inline-flex items-center gap-2 sm:self-end">
          <CalendarDaysIcon className="max-w-6 text-gray-500" />
          <span className="text-gray-500">
            {new Date(updated_at).toLocaleDateString()}
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default UserProfileReview;
