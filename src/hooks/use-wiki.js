import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabase/supabaseClient.js';

export function useWikiMovie(movieId) {
  const queryClient = useQueryClient();

  const fetchWikiMovie = async () => {
    const { data: wikiMovie, error: fetchError } = await supabase
      .from('wiki_movies')
      .select('*')
      .eq('movie_id', movieId)
      .maybeSingle();

    if (fetchError) {
      throw new Error('An error occurred while fetching the wiki movie.');
    }

    return wikiMovie;
  };

  const getWikiMovie = useQuery({
    queryKey: ['wikiMovie', movieId],
    queryFn: fetchWikiMovie,
  });

  const updateWikiMovie = async (updates) => {
    const { data, error } = await supabase
      .from('wiki_movies')
      .update(updates)
      .eq('movie_id', movieId);

    if (error) {
      throw new Error('An error occurred while updating the wiki movie.');
    }

    return data;
  };

  const updateWikiMovieMutation = useMutation({
    mutationFn: updateWikiMovie,
    onSuccess: () => {
      queryClient.invalidateQueries(['wikiMovie', movieId]);
    },
  });

  return {
    getWikiMovie,
    updateWikiMovie: updateWikiMovieMutation.mutateAsync,
  };
}
