import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/Dropdown';
import { useTheme } from '@/services/providers/theme-provider';
import { capitalize } from '@/utils/string/capitalize';
import {
  BookmarkIcon,
  ExitIcon,
  GearIcon,
  MoonIcon,
  PersonIcon,
  SunIcon,
} from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';

const Avatar = ({ userProfile }) => {
  const { theme, setTheme } = useTheme();
  const themeToSwitch = theme === 'dark' ? 'light' : 'dark';

  const navigate = useNavigate();
  const userAvatar = userProfile?.avatar
    ? userProfile?.avatar
    : 'https://api.dicebear.com/8.x/avataaars/png';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="icon">
          <img
            src={userAvatar}
            alt="User profile picture"
            className="aspect-square rounded-full object-cover max-w-12 cursor-pointer border border-muted-foreground"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{`@${userProfile?.username}`}</DropdownMenuLabel>
        <p className="pl-2 text-xs text-muted-foreground">
          {userProfile?.role && capitalize(userProfile?.role)}
        </p>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() =>
              userProfile?.user_id &&
              navigate(`/user/profile/${userProfile?.user_id}`)
            }
          >
            <PersonIcon className="mr-2" />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => navigate(`/dashboard/bookmarks`)}>
            <BookmarkIcon className="mr-2" />
            <span>Bookmarks</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => navigate(`/dashboard/settings`)}>
            <GearIcon className="mr-2" />
            <span>Account settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setTheme(themeToSwitch)}>
            {themeToSwitch === 'dark' ? (
              <MoonIcon className="mr-2" />
            ) : (
              <SunIcon className="mr-2" />
            )}
            <span>{capitalize(themeToSwitch)} theme</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => navigate('/dashboard/signout')}>
            <ExitIcon className="mr-2" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Avatar;
