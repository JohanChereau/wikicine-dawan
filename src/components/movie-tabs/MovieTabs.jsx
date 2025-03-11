import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import MovieCastTab from './MovieCastTab';
import MovieDiscoverTab from './MovieDiscoverTab';
import MovieReviewsTab from './MovieReviewsTab';
import { useMovieReviews } from '@/hooks/use-reviews';
import { useAuth } from '@/services/providers/auth-provider';

const MovieTabs = ({ movieId, movieTitle, moviePoster }) => {
  const { getReviews } = useMovieReviews(movieId);
  const { data: reviews, isLoading, isError } = getReviews;
  const { profile } = useAuth();

  const userReviews =
    reviews?.filter((review) => review?.user_profiles?.role !== 'contributor') || [];
  const contributorReviews =
    reviews?.filter((review) => review?.user_profiles?.role === 'contributor') || [];

  const userReviewExists = userReviews.some(
    (review) => review.user_id === profile?.user_id
  );
  const contributorReviewExists = contributorReviews.some(
    (review) => review.user_id === profile?.user_id
  );

  const reviewExists = userReviewExists || contributorReviewExists;

  return (
    <section>
      <Tabs defaultValue="reviews" className="basis-full">
        <TabsList>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="critics">Critics</TabsTrigger>
          <TabsTrigger value="cast">Cast</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>
        <TabsContent value="reviews">
          <MovieReviewsTab
            reviews={userReviews}
            movieId={movieId}
            movieTitle={movieTitle}
            moviePoster={moviePoster}
            tabRole="user"
            reviewExists={reviewExists}
            isLoading={isLoading}
            isError={isError}
          />
        </TabsContent>
        <TabsContent value="critics">
          <MovieReviewsTab
            reviews={contributorReviews}
            movieId={movieId}
            movieTitle={movieTitle}
            moviePoster={moviePoster}
            tabRole="contributor"
            reviewExists={reviewExists}
            isLoading={isLoading}
            isError={isError}
          />
        </TabsContent>
        <TabsContent value="cast">
          <MovieCastTab movieId={movieId} />
        </TabsContent>
        <TabsContent value="discover">
          <MovieDiscoverTab movieId={movieId} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default MovieTabs;
