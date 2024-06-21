import { cn } from '@/utils/style/cn.js';

function Skeleton({ className, ...props }) {
  return (
    <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />
  );
}

export { Skeleton };
