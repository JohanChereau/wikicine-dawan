import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import MovieRating from '@/components/ui/MovieRating';
import { Skeleton } from '../ui/Skeleton';
import { truncateText } from '@/utils/string/truncate';

const UserProfileReview = ({ review }) => {
  if (!review) return <Skeleton className="w-full h-40" />;

  const {
    id,
    user_id,
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
            className="aspect-square object-cover rounded-full w-8 md:w-12 cursor-pointer"
          />
          <div className="flex flex-col">
            <p className="font-semibold text-base md:text-xl hover:underline hover:underline-offset-4 hover:decoration-accent-foreground">
              {username || 'Unknown user'}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <MovieRating rating={rating} ratingScale={5} showVoteCount={false} />
            </div>
          </div>
        </div>
        <button className="text-sm text-gray-500 hover:text-white hover:underline-none">Show more</button> 
      </CardHeader>
      <CardContent className="flex gap-4">
        <div className="flex flex-col items-center">
          <img src={movie_poster} alt={`${movie_title} poster`} className="h-auto rounded-lg max-w-20 md:max-w-32"/>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <p>{truncateText(comment, 600, "...")}</p>
        </div>
      </CardContent>
      <CardFooter className="w-full flex justify-between flex-wrap gap-4 items-center text-muted-foreground">
        <p className="font-semibold text-gray-500">{movie_title}</p> 
        <span className="text-gray-500">{new Date(updated_at).toLocaleDateString()}</span> 
      </CardFooter>
    </Card>
  );
};

export default UserProfileReview;









