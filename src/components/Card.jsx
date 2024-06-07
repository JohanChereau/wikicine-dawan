import { FaStar } from 'react-icons/fa';
import Badge from './Badge';

const Card = ({ moviePoster, movieTitle, releaseDate, rating }) => {
  return (
    <div className="grid grid-rows-subgrid row-span-4 gap-2 items-center">
      <div>
        <img
          className="aspect-[2/3] object-cover image rounded-md"
          src={moviePoster}
          alt={`${movieTitle}'s poster`}
        />
      </div>

      <h4 className="text-xl font-bold">{movieTitle}</h4>

      <p className="text-muted-foreground text-base">{releaseDate}</p>

      <Badge rating={rating} Icon={FaStar} iconClassName="text-primary" />
    </div>
  );
};

export default Card;
