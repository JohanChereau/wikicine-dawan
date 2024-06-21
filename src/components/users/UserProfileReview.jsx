import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import MovieRating from '@/components/ui/MovieRating';
import { Skeleton } from '../ui/Skeleton';

const UserProfileReview = ({ review }) => {
  const {
    id,
    user_id,
    movie_id,
    movie_title,
    movie_poster,
    rating,
    updated_at,
    user_profiles: { role, avatar, username },
  } = review;

  if (!review) return <Skeleton className="w-full h-40" />;

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap gap-4 justify-between items-center">
        <img
          src={`${
            avatar ? avatar : 'https://placehold.co/300x300/FACC15/black?text=User'
          }`}
          alt={`${username || 'Unknown user'}'s avatar`}
          className="aspect-square object-cover rounded-full w-8 md:w-12 cursor-pointer"
        />
        <div className="inline-flex items-center gap-2">
          <p className="font-semibold text-base md:text-xl hover:underline hover:underline-offset-4 hover:decoration-accent-foreground">
            Text
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <MovieRating rating={5} ratingScale={5} showVoteCount={false} />

          <span className="ml-2 text-lg font-semibold"></span>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
          odio vitae vestibulum vestibulum.
        </p>
      </CardContent>
      <CardFooter className="w-fit flex gap-2 ml-auto text-muted-foreground"></CardFooter>
    </Card>
  );
};

export default UserProfileReview;
