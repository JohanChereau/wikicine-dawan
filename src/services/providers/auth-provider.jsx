import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    profile: null,
    session: null,
  });
  const [channel, setChannel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserInfo((prevUserInfo) => ({ ...prevUserInfo, session }));
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserInfo({ session, profile: null });
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const updateUserProfile = async () => {
      if (userInfo.session?.user && !userInfo.profile) {
        setIsLoading(true);
        const newChannel = await listenToUserProfileChanges(
          userInfo.session.user.id
        );
        if (channel) {
          channel.unsubscribe();
        }
        setChannel(newChannel);
      } else if (!userInfo.session?.user) {
        channel?.unsubscribe();
        setChannel(null);
      }
    };

    updateUserProfile();
  }, [userInfo.session]);

  async function listenToUserProfileChanges(userId) {
    try {
      const { data } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId);

      if (data?.[0]) {
        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, profile: data[0] }));
      }

      return supabase
        .channel(`public:user_profiles`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'user_profiles',
            filter: `user_id=eq.${userId}`,
          },
          (payload) => {
            setUserInfo((prevUserInfo) => ({
              ...prevUserInfo,
              profile: payload.new,
            }));
          }
        )
        .subscribe();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ ...userInfo, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
