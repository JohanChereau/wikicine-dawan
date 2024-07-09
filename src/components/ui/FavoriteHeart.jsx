import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { Button } from './Button';

const FavoriteHeart = ({ isFavorite = false }) => {
  if (isFavorite) {
    return (
      <Button>
        <IoHeartSharp />;
      </Button>
    );
  } else {
    return (
      <Button>
        <IoHeartOutline />
      </Button>
    );
  }
};

export default FavoriteHeart;
