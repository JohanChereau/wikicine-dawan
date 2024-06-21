import { BiSolidBadgeCheck } from 'react-icons/bi';
import { IoShieldCheckmarkSharp } from 'react-icons/io5';

export const ROLES = {
  user: {
    icon: null,
    text: 'User',
    color: 'text-foreground',
  },
  contributor: {
    icon: BiSolidBadgeCheck,
    text: 'Contributor',
    color: 'text-primary',
  },
  admin: {
    icon: IoShieldCheckmarkSharp,
    text: 'Administrator',
    color: 'text-red-500',
  },
};
