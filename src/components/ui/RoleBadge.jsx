import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { BADGES } from '@/utils/icons/Badges';

const RoleBadge = ({ role }) => {
  const badgeData = BADGES[role];

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
