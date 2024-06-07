import { useAuth } from '@/services/providers/auth-provider';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Skeleton } from './ui/Skeleton';

const ProtectedRoute = () => {
  const { session, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!session) {
      navigate('/signin', { replace: true });
    }
  }, [navigate, session, isLoading]);

  if (isLoading) {
    return (
      <section className="grid gap-8">
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
      </section>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
