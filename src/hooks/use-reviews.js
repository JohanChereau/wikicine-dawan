import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/services/supabase/supabaseClient.js';

export function useReviews(movieId) {
  const fetchReviewsWithProfiles = async () => {
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select('*, user_profiles(username, role, avatar)')
      .eq('movie_id', movieId)
      .order('created_at', { ascending: false });

    if (reviewsError) {
      throw new Error('An error occurred while fetching reviews.');
    }

    return reviews ?? [];
  };

  const getReviews = useQuery({
    queryKey: ['reviews', movieId],
    queryFn: fetchReviewsWithProfiles,
  });

  const addReview = async (reviewData) => {
    const { data, error } = await supabase.from('reviews').insert(reviewData);

    if (error) {
      throw new Error('An error occurred while adding the review.');
    }

    return data;
  };

  const addReviewMutation = useMutation({
    mutationFn: addReview,
  });

  return {
    getReviews,
    addReview: addReviewMutation.mutateAsync,
  };
}

export function useUserReviews(userId) {
  const fetchUserReviews = async () => {
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select('*, user_profiles(username, role, avatar)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (reviewsError) {
      throw new Error('An error occurred while fetching user reviews.');
    }

    return reviews ?? [];
  };

  const getUserReviews = useQuery({
    queryKey: ['userReviews', userId],
    queryFn: fetchUserReviews,
  });

  return {
    getUserReviews,
  };
}
