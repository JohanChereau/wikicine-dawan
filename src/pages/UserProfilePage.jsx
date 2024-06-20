import UserHeader from '@/components/users/UserHeader';
import UserTabs from '@/components/users/UserTabs';
import { FaInfoCircle, FaShare } from 'react-icons/fa';
import { ScrollRestoration, useParams } from 'react-router-dom';
import { useUserReviews } from '@/hooks/use-reviews';
import { useUserProfile } from '@/hooks/use-userProfile';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';

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

      <section className="grid grid-flow-row sm:grid-cols-2 gap-4 my-6">
        <Button variant="secondary" size="lg">
          <FaInfoCircle className="mr-2" />
          <span>Report Account</span>
        </Button>
        <Button size="lg">
          <FaShare className="mr-2" />
          <span>Share Profile</span>
        </Button>
      </section>

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
