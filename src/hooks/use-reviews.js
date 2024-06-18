import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabase/supabaseClient.js';

export function useReviews(movieId) {
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', movieId]);
    },
  });

  return {
    getReviews,
    addReview: addReviewMutation.mutateAsync,
  };
}
