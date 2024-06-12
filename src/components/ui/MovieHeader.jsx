import { Link } from 'react-router-dom';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import Badge from './Badge';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import MovieRating from './MovieRating';

const MovieHeader = ({ movieData }) => {
  const navigate = useNavigate();

  const handleGoToPreviousPage = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const {
    backdrop_path: backdropPath,
    title = 'Title not available',
    release_date: releaseDate = 'Date not available',
    production_companies: productionCompanies = [],
    vote_average: voteAverage = 0,
    vote_count: voteCount = 0,
    genres = [],
  } = movieData || {};

  const backdropUrl = backdropPath
    ? `https://image.tmdb.org/t/p/original${backdropPath}`
    : '';

  return (
    <section
      className={`grid grid-rows-[auto_3fr] gap-2 min-h-64 text-center bg-no-repeat bg-top bg-cover rounded-md`}
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      <div className="flex justify-between items-center gap-6 p-6">
        <Button className="shadow-lg text-white" variant="iconDark" asChild>
          <Link to=".." onClick={handleGoToPreviousPage}>
            <ArrowLeftIcon />
          </Link>
        </Button>
        <Button className="shadow-lg" asChild>
          <Link to={`/movie/wiki/id`}>Wiki</Link>
        </Button>
      </div>

      <div className="grid gap-3 self-end translate-y-2 pt-20 pb-6 dark:pb-0 bg-gradient-to-t from-black dark:from-background to-transparent rounded-b-md">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white">{title}</h2>
        <p className="text-zinc-300 text-base md:text-lg">
          {releaseDate} ·{' '}
          {productionCompanies[0]?.name || 'Production company not available'}
        </p>

        <MovieRating rating={voteAverage} voteCount={voteCount} />

        <div className="flex justify-center items-center gap-4 flex-wrap">
          {genres.length > 0 ? (
            genres.map((genre) => (
              <Badge
                key={genre.id}
                text={genre.name}
                textClassName="text-white"
                displayIcon={false}
              />
            ))
          ) : (
            <Badge
              text="No genres available"
              textClassName="text-white"
              displayIcon={false}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieHeader;
