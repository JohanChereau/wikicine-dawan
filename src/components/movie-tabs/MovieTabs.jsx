import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import MovieCastTab from './MovieCastTab';
import MovieReviewsTab from './MovieReviewsTab';

const MovieTabs = ({ movieId, movieTitle }) => {
  return (
    <section>
      <Tabs defaultValue="reviews" className="basis-full">
        <TabsList>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="critics">Critics</TabsTrigger>
          <TabsTrigger value="cast">Cast</TabsTrigger>
          <TabsTrigger value="anecdotes">Anecdotes</TabsTrigger>
        </TabsList>
        <TabsContent value="reviews">
          <MovieReviewsTab movieId={movieId} movieTitle={movieTitle} />
        </TabsContent>
        <TabsContent value="critics">Critics</TabsContent>
        <TabsContent value="cast">
          <MovieCastTab movieId={movieId} />
        </TabsContent>
        <TabsContent value="anecdotes">Anecdotes</TabsContent>
      </Tabs>
    </section>
  );
};

export default MovieTabs;
