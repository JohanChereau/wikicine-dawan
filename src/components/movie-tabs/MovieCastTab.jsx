import { Skeleton } from '@/components/ui/Skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { useMovies } from '@/hooks/use-movies';

const MovieCastTab = ({ movieId }) => {
  const { useMovieCredits } = useMovies();
  const { data, isLoading } = useMovieCredits(movieId);

  const placeholderImage =
    'https://placehold.co/400x600/FACC15/black?text=Wikicin%C3%A9';

  if (isLoading) {
    return (
      <ul className="grid grid-cols-auto-fit-200 gap-4">
        {Array(4)
          .fill()
          .map((_, index) => (
            <Skeleton key={index} className="w-full aspect-[2/3]" />
          ))}
      </ul>
    );
  }

  if (!isLoading && !data?.cast?.length) {
    return <p>No casting found for this movie.</p>;
  }

  return (
    <ul className="grid grid-cols-auto-fit-150 sm:grid-cols-auto-fit-200 gap-4">
      {data?.cast?.map((actor) => {
        const profileImage = actor?.profile_path
          ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
          : placeholderImage;

        return (
          <li key={actor?.id} className="grid">
            <Card className="pt-6 grid grid-rows-subgrid row-span-2 text-center">
              <CardContent>
                <img
                  src={profileImage}
                  alt={`${actor?.original_name || 'Unknown actor'}'s profile photo`}
                  className="rounded-md aspect-[2/3] object-cover max-h-44 mx-auto"
                />
              </CardContent>
              <CardHeader>
                <CardTitle className="text-base sm:text-xl">
                  {actor?.name || 'Unknown actor'}
                </CardTitle>
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

export default MovieCastTab;
