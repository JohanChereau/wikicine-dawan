import UserHeader from '@/components/users/UserHeader';
import UserTabs from '@/components/users/UserTabs';
import { ScrollRestoration, useParams } from 'react-router-dom';
import { useUserReviews } from '@/hooks/use-reviews';
import { useUserProfile } from '@/hooks/use-userProfile';
import { Skeleton } from '@/components/ui/Skeleton';
import UserProfileActions from '@/components/users/UserProfileActions';

const UserProfilePage = () => {
  const { id } = useParams();

  const { getUserProfile } = useUserProfile(id);
  const {
    data: userProfile,
    isLoading: isUserProfileLoading,
    isError: isUserProfileError,
  } = getUserProfile;

  const { data: reviews, isReviewsLoading, isReviewsError } = useUserReviews(id);

  if (isUserProfileLoading) {
    return (
      <section className="grid grid-flow-row gap-4">
        <Skeleton className="w-full h-60" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-40" />
      </section>
    );
  }

  if (isUserProfileError) {
    return <p>Error fetching the user profile.</p>;
  }

  return (
    <article className="grid grid-flow-row gap-8 max-w-[1000px] mx-auto">
      <UserHeader userProfile={userProfile} />

      <UserProfileActions userProfile={userProfile} />

      <UserTabs
        reviews={reviews}
        isLoading={isReviewsLoading}
        isError={isReviewsError}
      />

      <ScrollRestoration />
    </article>
  );
};

export default UserProfilePage;
