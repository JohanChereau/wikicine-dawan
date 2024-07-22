import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './Carousel';
import MoviePreviewCard from './MoviePreviewCard';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { truncateText } from '@/utils/string/truncate';

const placeholderImage =
  'https://placehold.co/400x600/FACC15/black?text=Wikicin%C3%A9';

const MoviesCarousel = ({
  movies = [],
  sectionTitle = 'Section title',
  action = 'View all',
  actionLink = '/movies/category/popular',
}) => {
  return (
    <div className="max-w-full grid gap-4 md:gap-12 sm:px-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl md:text-4xl font-bold">{sectionTitle}</h3>
        <Button variant="link" asChild>
          <Link
            className="text-muted-foreground text-base"
            to={`/movies/category/${actionLink}`}
          >
            {action}
          </Link>
        </Button>
      </div>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="grid"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {movies.map((movie) => {
            const moviePoster = movie?.poster_path
              ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
              : placeholderImage;
            const movieTitle = truncateText(
              movie?.title || 'Unknown Title',
              32,
              '...'
            );
            const releaseDate = movie?.release_date || 'Unknown Date';
            const rating = movie?.vote_average
              ? Number(movie.vote_average.toFixed(1))
              : 0;

            return (
              <CarouselItem
                key={movie?.id || Math.random()}
                className="aspect-[2/3] basis-3/4 lg:basis-1/6 grid content-between max-w-44 md:max-w-52"
              >
                <MoviePreviewCard
                  movieId={movie?.id}
                  moviePoster={moviePoster}
                  movieTitle={movieTitle}
                  releaseDate={releaseDate}
                  rating={rating}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:grid place-items-center place-content-center" />
        <CarouselNext className="hidden sm:grid place-items-center place-content-center" />
      </Carousel>
    </div>
  );
};

export default MoviesCarousel;
