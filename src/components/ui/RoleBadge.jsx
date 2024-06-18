import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { ROLES } from '@/utils/icons/roles';

const RoleBadge = ({ role }) => {
  const badgeData = ROLES[role];

  if (!badgeData) return null;

  const { icon: BadgeIcon, text: badgeText, color: badgeColor } = badgeData;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <BadgeIcon className={`w-7 h-7 ${badgeColor}`} />
        </TooltipTrigger>
        <TooltipContent>{badgeText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RoleBadge;
