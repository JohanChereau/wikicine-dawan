import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    profile: null,
    session: null,
    authEvent: null,
  });
  const [channel, setChannel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Error fetching session:', sessionError);
        setError(sessionError);
        setIsLoading(false);
        return;
      }

      setUserInfo((prevUserInfo) => ({ ...prevUserInfo, session }));

      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        session,
        authEvent: event,
      }));
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        throw new Error('Error fetching user profile: ' + error.message);
      }

      if (data) {
        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, profile: data }));
      }

      const newChannel = supabase
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

      if (channel) {
        channel.unsubscribe();
      }
      setChannel(newChannel);
    } catch (error) {
      console.error(error.message);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

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
