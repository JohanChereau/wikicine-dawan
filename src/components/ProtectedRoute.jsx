import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Skeleton } from './ui/Skeleton';
import { useAuth } from '@/services/providers/auth-provider';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { session, profile, isLoading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!session) {
      navigate('/signin', { replace: true });
      return;
    }

    if (!profile || !allowedRoles.includes(profile.role)) {
      navigate('/', { replace: true });
    }
  }, [navigate, session, isLoading, allowedRoles, profile]);

  if (isLoading) {
    return (
      <section className="grid gap-8">
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
      </section>
    );
  }

  if (error) return <p>Error : {error?.message}</p>;

  return <Outlet />;
};

export default ProtectedRoute;
