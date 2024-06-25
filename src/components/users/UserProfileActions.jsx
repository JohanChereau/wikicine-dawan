import { useAuth } from '@/services/providers/auth-provider';
import { Button } from '../ui/Button';
import { FaInfoCircle, FaShare } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const UserProfileActions = ({ userProfile }) => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    navigate('/dashboard/signout');
  };

  const handleShareProfile = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Profile URL copied to clipboard',
        description: 'You can now share this profile with others.',
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'Failed to copy URL',
        description: 'There was an error copying the profile URL to the clipboard.',
        status: 'error',
      });
    }
  };

  if (session?.user?.id === userProfile.user_id) {
    return (
      <section className="grid grid-flow-row sm:grid-cols-2 gap-4 my-6">
        <Button
          variant="secondary"
          size="lg"
          onClick={handleLogout}
          aria-label="Logout"
        >
          <FiLogOut className="mr-2" />
          <span>Logout</span>
        </Button>
        <Button size="lg" onClick={handleShareProfile} aria-label="Share my profile">
          <FaShare className="mr-2" />
          <span>Share my profile</span>
        </Button>
      </section>
    );
  } else {
    return (
      <section className="grid grid-flow-row sm:grid-cols-2 gap-4 my-6">
        <Button variant="secondary" size="lg" aria-label="Report Account">
          <FaInfoCircle className="mr-2" />
          <span>Report Account</span>
        </Button>
        <Button size="lg" onClick={handleShareProfile} aria-label="Share Profile">
          <FaShare className="mr-2" />
          <span>Share Profile</span>
        </Button>
      </section>
    );
  }
};

export default UserProfileActions;
