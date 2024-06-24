import { Button } from '@/components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import RoleBadge from '../ui/RoleBadge';

const UserHeader = ({ userProfile }) => {
  const { username, bio, avatar, banner, role } = userProfile;

  const navigate = useNavigate();

  const handleGoToPreviousPage = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <header
      className="grid grid-rows-[auto_3fr] gap-2 min-h-64 text-center bg-no-repeat bg-cover bg-center rounded-md"
      style={{
        backgroundImage: banner
          ? `url(${banner})`
          : 'url(https://placehold.co/600x400/black/black)',
      }}
    >
      <Button className="shadow-lg text-white ml-6 mt-6" variant="iconDark" asChild>
        <Link to=".." onClick={handleGoToPreviousPage}>
          <ArrowLeftIcon />
        </Link>
      </Button>

      <div className="grid gap-3 self-end translate-y-2 pt-20 pb-6 dark:pb-0 bg-gradient-to-t from-black dark:from-background to-transparent rounded-b-md">
        <div className="flex flex-col justify-center items-center gap-4">
          <img
            src={`${
              avatar ? avatar : 'https://placehold.co/300x300/FACC15/black?text=User'
            }`}
            alt={`${username || 'Unknown user'}'s avatar`}
            className="aspect-square object-cover rounded-full max-w-16 md:max-w-24 cursor-pointer"
          />
          <div className="inline-flex items-center gap-2">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white">
              @{username || 'Unknown user'}
            </h2>
            <RoleBadge role={role || 'user'} />
          </div>
        </div>
        <p className="text-zinc-300 text-base md:text-lg">{bio || ''}</p>
      </div>
    </header>
  );
};

export default UserHeader;
