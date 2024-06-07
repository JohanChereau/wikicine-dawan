import { useAuth } from '@/services/providers/auth-provider';
import Avatar from '../Avatar';
import { Button } from './Button';
import { EnterIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { Skeleton } from './Skeleton';

const Header = () => {
  const { session, profile, isLoading } = useAuth();

  return (
    <header className="container flex justify-between items-center p-4">
      <h1>
        <Link to="/" className="text-2xl font-bold text-foreground">
          Wikiciné
        </Link>
      </h1>

      <div>
        {isLoading && <Skeleton className="w-12 aspect-square rounded-full" />}
        {!isLoading && session && <Avatar userProfile={profile} />}
        {!isLoading && !session && (
          <Button variant="outline" asChild>
            <Link to="/signin">
              <EnterIcon />
              <span>Sign In</span>
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
