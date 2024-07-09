import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { Button } from './Button';

const FavoriteHeart = ({ isFavorite = false, onClick }) => {
  return (
    <Button onClick={onClick}>
      {isFavorite ? <IoHeartSharp /> : <IoHeartOutline />}
    </Button>
  );
};

export default FavoriteHeart;
