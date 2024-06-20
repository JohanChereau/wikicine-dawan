import { Button } from '@/components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { ArrowLeftIcon } from 'lucide-react';

const UserHeader = ({ userProfile }) => {
  const { username, role, bio, avatar, banner } = userProfile;

  const navigate = useNavigate();

  const handleGoToPreviousPage = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <header
      className="grid grid-rows-[auto_3fr] gap-2 min-h-64 text-center bg-no-repeat bg-top bg-cover rounded-md"
      style={{ background: banner ? `url(${banner})` : 'black' }}
    >
      <Button className="shadow-lg text-white" variant="iconDark" asChild>
        <Link to=".." onClick={handleGoToPreviousPage}>
          <ArrowLeftIcon />
        </Link>
      </Button>

      <div className="grid gap-3 self-end translate-y-2 pt-20 pb-6 dark:pb-0 bg-gradient-to-t from-black dark:from-background to-transparent rounded-b-md">
        <div className="flex flex-col justify-center items-center gap-4">
          <FaUserCircle className="text-white text-7xl" />
          <h2 className="text-3xl sm:text-4xl font-semibold text-white">
            @{username || 'Unknown user'}
          </h2>
        </div>
        <p className="text-zinc-300 text-base md:text-lg">Bio</p>
      </div>
    </header>
  );
};

export default UserHeader;
