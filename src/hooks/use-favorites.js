import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabase/supabaseClient.js';

export function useFavorites(userId) {
  const queryClient = useQueryClient();

  const fetchFavorites = async () => {
    if (!userId) return [];

    const { data: favorites, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      throw new Error('An error occurred while fetching the favorites.');
    }

    return favorites;
  };

  const getFavorites = useQuery({
    queryKey: ['favorites', userId],
    queryFn: fetchFavorites,
    enabled: !!userId,
  });

  const addFavorite = useMutation({
    mutationFn: async (movie) => {
      if (!userId) throw new Error('User is not authenticated');

      const { data, error } = await supabase
        .from('favorites')
        .insert({ ...movie, user_id: userId });

      if (error) {
        throw new Error('An error occurred while adding the favorite.');
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites', userId]);
    },
  });

  const removeFavorite = useMutation({
    mutationFn: async (movieId) => {
      if (!userId) throw new Error('User is not authenticated');

      const { data, error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('movie_id', movieId);

      if (error) {
        throw new Error('An error occurred while removing the favorite.');
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites', userId]);
    },
  });

  return {
    getFavorites,
    addFavorite: addFavorite.mutateAsync,
    removeFavorite: removeFavorite.mutateAsync,
  };
}
