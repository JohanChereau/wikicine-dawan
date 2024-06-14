import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabase/supabaseClient.js';

export function useUserProfile(username) {
  const queryClient = useQueryClient();

  const fetchUserProfile = async () => {
    const { data: userProfile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('username', username)
      .single();

    if (profileError) {
      throw new Error('An error occurred while fetching the user profile.');
    }

    return userProfile;
  };

  const getUserProfile = useQuery({
    queryKey: ['userProfile', username],
    queryFn: fetchUserProfile,
  });

  const updateUserProfile = async (profileData) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(profileData)
      .eq('username', username);

    if (error) {
      throw new Error('An error occurred while updating the user profile.');
    }

    return data;
  };

  const updateUserProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile', username]);
    },
  });

  return {
    getUserProfile,
    updateUserProfile: updateUserProfileMutation.mutateAsync,
  };
}
