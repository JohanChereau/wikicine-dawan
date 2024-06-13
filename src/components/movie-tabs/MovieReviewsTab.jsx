import { useState, useEffect } from 'react';
import { useReviews } from '@/hooks/use-reviews';
import { useAuth } from '@/services/providers/auth-provider';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import MovieComment from '../ui/MovieComment';
import MovieReviewModal from '../modals/MovieReviewModal';

const filterReviews = (reviews, sortBy) => {
  return [...reviews].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return sortBy === 'latest' ? dateB - dateA : dateA - dateB;
  });
};

const MovieReviewsTab = ({ movieId, movieTitle }) => {
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

        <MovieReviewModal
          triggerDisabled={hasReview}
          movieTitle={movieTitle}
          movieId={movieId}
        />
      </div>
      {reviews && reviews.length === 0 && <p>No reviews available.</p>}
      <ul className="grid grid-flow-row gap-4">
        {filteredReviews.map((review) => (
          <li key={review?.id}>
            <MovieComment review={review} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieReviewsTab;
