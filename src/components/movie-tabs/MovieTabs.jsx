import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import MovieCast from './MovieCast';

const MovieTabs = ({ movieId }) => {
  return (
    <section>
      <Tabs defaultValue="reviews" className="basis-full">
        <TabsList>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="critics">Critics</TabsTrigger>
          <TabsTrigger value="cast">Cast</TabsTrigger>
          <TabsTrigger value="anecdotes">Anecdotes</TabsTrigger>
        </TabsList>
        <TabsContent value="reviews">Reviews</TabsContent>
        <TabsContent value="critics">Critics</TabsContent>
        <TabsContent value="cast">
          <MovieCast movieId={movieId} />
        </TabsContent>
        <TabsContent value="anecdotes">Anecdotes</TabsContent>
      </Tabs>
    </section>
  );
};

export default MovieTabs;
