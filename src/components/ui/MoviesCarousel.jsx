import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './Carousel';
import Card from '../Card';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { truncateText } from '@/utils/string/truncate';

const MoviesCarousel = ({
  movies,
  sectionTitle = 'Section title',
  action = 'View all',
}) => {
  return (
    <div className="max-w-full grid gap-4 sm:px-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl md:text-4xl font-bold">{sectionTitle}</h3>
        <Button variant="link" asChild>
          <Link className="text-muted-foreground text-base">{action}</Link>
        </Button>
      </div>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="grid"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {movies?.map((movie) => {
            return (
              <CarouselItem
                key={movie.id}
                className="aspect-[2/3] basis-3/4 lg:basis-1/6 select-none cursor-pointer grid max-w-52"
              >
                <Card
                  moviePoster={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  movieTitle={truncateText(movie.title, 32, '...')}
                  releaseDate={movie.release_date}
                  rating={Number(movie.vote_average.toFixed(1))}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:block" />
        <CarouselNext className="hidden sm:block" />
      </Carousel>
    </div>
  );
};

export default MoviesCarousel;
