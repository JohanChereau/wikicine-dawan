import { useState, useEffect } from 'react';
import { useReviews } from '@/hooks/use-reviews';
import { useAuth } from '@/services/providers/auth-provider';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import MovieRating from '../ui/MovieRating';
import { CalendarDaysIcon } from 'lucide-react';
import RoleBadge from '../ui/RoleBadge';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

const filterReviews = (reviews, sortBy) => {
  return [...reviews].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return sortBy === 'latest' ? dateB - dateA : dateA - dateB;
  });
};

const MovieReviewsTab = ({ movieId }) => {
  const { getReviews } = useReviews(movieId);
  const { data: reviews, isLoading, isError } = getReviews;
  const { profile } = useAuth();

  const [sortBy, setSortBy] = useState('latest');
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [hasReview, setHasReview] = useState(false);

  useEffect(() => {
    if (reviews) {
      const userReviews = reviews.filter(
        (review) => review?.user_profiles?.role !== 'contributor'
      );
      const filtered = filterReviews(userReviews, sortBy);
      setFilteredReviews(filtered);

      if (profile?.user_id) {
        const userReview = reviews.find(
          (review) =>
            review.user_id === profile?.user_id && review.movie_id === movieId
        );
        setHasReview(!!userReview);
      }
    }
  }, [reviews, sortBy, profile?.user_id, movieId]);

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  if (isLoading) return <p>Loading reviews...</p>;
  if (isError) return <p>Error fetching reviews.</p>;

  return (
    <section>
      <div className="grid grid-cols-2 gap-4 mt-6 mb-8">
        <Select
          value={sortBy}
          onValueChange={handleSortChange}
          disabled={reviews && reviews.length === 0}
        >
          <SelectTrigger>
            <SelectValue placeholder="Latest reviews" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sorting reviews</SelectLabel>
              <SelectItem value="latest">Latest reviews</SelectItem>
              <SelectItem value="oldest">Oldest reviews</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button disabled={hasReview}>
          {hasReview ? 'Review already posted' : 'Add a review'}
        </Button>
      </div>
      {reviews && reviews.length === 0 && <p>No reviews available.</p>}
      <ul className="grid grid-flow-row gap-4">
        {filteredReviews.map((review) => (
          <li key={review?.id}>
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
                    <RoleBadge role={review?.user_profiles?.role} />
                  </div>
                </Link>
                <MovieRating
                  rating={review?.rating}
                  ratingScale={5}
                  showVoteCount={false}
                />
              </CardHeader>
              <CardContent>{review?.comment || 'No comment available.'}</CardContent>
              <CardFooter className="w-fit flex gap-2 ml-auto text-muted-foreground">
                <CalendarDaysIcon className="max-w-6" />
                <span>
                  {new Date(review?.created_at).toLocaleDateString() ||
                    'Unknown Date'}
                </span>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieReviewsTab;
