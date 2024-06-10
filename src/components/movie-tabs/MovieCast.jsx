import { Skeleton } from '@/components/ui/Skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { useMovies } from '@/hooks/use-movies';

const MovieCast = ({ movieId }) => {
  const { useMovieCredits } = useMovies();
  const { data, isLoading } = useMovieCredits(movieId);

  const placeholderImage =
    'https://placehold.co/400x600/FACC15/black?text=Wikicin%C3%A9';

  if (isLoading) {
    return (
      <section className="grid grid-cols-auto-fit-200 gap-4">
        <Skeleton className="w-full aspect-[2/3]" />
        <Skeleton className="w-full aspect-[2/3]" />
        <Skeleton className="w-full aspect-[2/3]" />
        <Skeleton className="w-full aspect-[2/3]" />
      </section>
    );
  }

  if (!isLoading && !data?.cast?.length) {
    return (
      <section>
        <p>No casting found for this movie.</p>
      </section>
    );
  }

  return (
    <ul className="grid grid-cols-auto-fit-200 gap-4">
      {data?.cast?.map((actor) => {
        const profileImage = actor?.profile_path
          ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
          : placeholderImage;

        return (
          <li key={actor?.id} className="grid">
            <Card className="pt-6 grid grid-rows-subgrid row-span-2">
              <CardContent>
                <img
                  src={profileImage}
                  alt={`${actor?.original_name || 'Unknown actor'}'s profile photo`}
                  className="rounded-md aspect-[2/3] object-cover"
                />
              </CardContent>
              <CardHeader>
                <CardTitle>{actor?.original_name || 'Unknown actor'}</CardTitle>
                <CardDescription>
                  {actor?.character || 'Unknown character'} (
                  {actor?.known_for_department || 'Unknown department'})
                </CardDescription>
              </CardHeader>
            </Card>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieCast;
