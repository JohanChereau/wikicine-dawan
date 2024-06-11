import { BiSolidBadgeCheck } from 'react-icons/bi';
import { IoShieldCheckmarkSharp } from 'react-icons/io5';

export const BADGES = {
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
