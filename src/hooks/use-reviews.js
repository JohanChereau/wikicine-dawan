import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabase/supabaseClient.js';

export function useMovieReviews(movieId) {
  const queryClient = useQueryClient();

  const fetchMovieReviews = async () => {
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
    queryFn: fetchMovieReviews,
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

export function useUserReviews(id) {
  const fetchUserReviews = async () => {
    const { data: reviews, error: userReviewsError } = await supabase
      .from('reviews')
      .select('*, user_profiles(username, role, avatar)')
      .eq('user_id', id)
      .order('created_at', { ascending: false });

    if (userReviewsError) {
      throw new Error('An error occurred while fetching user reviews.');
    }

    return reviews ?? [];
  };

  return useQuery({
    queryKey: ['userReviews', id],
    queryFn: fetchUserReviews,
  });
}
