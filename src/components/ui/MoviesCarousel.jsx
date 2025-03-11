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
      <Carousel opts={{ align: 'start' }} className="grid">
        <CarouselContent className="-ml-2 md:-ml-4">
          {movies.map((movie) => (
            <CarouselItem
              key={movie?.id || Math.random()}
              className="aspect-[2/3] basis-3/4 lg:basis-1/6 grid content-between max-w-44 md:max-w-52"
            >
              <MoviePreviewCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:grid place-items-center place-content-center" />
        <CarouselNext className="hidden sm:grid place-items-center place-content-center" />
      </Carousel>
    </div>
  );
};

export default MoviesCarousel;
