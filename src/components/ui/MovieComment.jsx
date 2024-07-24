import { useState } from 'react';
import MovieRating from '@/components/ui/MovieRating';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';
import { CalendarDaysIcon } from 'lucide-react';
import RoleBadge from '../ui/RoleBadge';
import { Link } from 'react-router-dom';
import MarkdownPreview from '../MarkdownPreview';
import { Button } from '../ui/Button';
import { truncateText } from '@/utils/string/truncate';

const MovieComment = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const comment = review?.comment || 'No comment available.';
  const truncatedComment = truncateText(comment, 300, '...');

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap gap-4 justify-between">
        <Link
          to={`/user/profile/${review?.user_id}`}
          className="inline-flex items-center gap-4"
        >
          <img
            src={
              review?.user_profiles?.avatar ||
              'https://placehold.co/300x300/FACC15/black?text=Wikicin%C3%A9'
            }
            alt={`${review?.user_profiles?.username}'s avatar`}
            className="aspect-square object-cover rounded-full w-8 md:w-12 cursor-pointer"
          />
          <div className="inline-flex items-center gap-2">
            <p className="font-semibold text-base md:text-xl hover:underline hover:underline-offset-4 hover:decoration-accent-foreground">{`@${
              review?.user_profiles?.username || 'Unknown User'
            }`}</p>
            <RoleBadge role={review?.user_profiles?.role || 'user'} />
          </div>
        </Link>
        <MovieRating rating={review?.rating} ratingScale={5} showVoteCount={false} />
      </CardHeader>
      <CardContent>
        {review?.user_profiles?.role === 'contributor' ? (
          <MarkdownPreview>
            {isExpanded ? comment : truncatedComment}
          </MarkdownPreview>
        ) : (
          <p>{isExpanded ? comment : truncatedComment}</p>
        )}
        {comment.length > 300 && (
          <Button
            onClick={handleToggleExpand}
            className="w-fit p-0 mt-2"
            variant="link"
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </Button>
        )}
      </CardContent>
      <CardFooter className="w-fit flex gap-2 ml-auto text-muted-foreground">
        <CalendarDaysIcon className="max-w-6" />
        <span>
          {new Date(review?.created_at).toLocaleDateString() || 'Unknown Date'}
        </span>
      </CardFooter>
    </Card>
  );
};

export default MovieComment;
