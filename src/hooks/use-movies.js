import { useQuery } from '@tanstack/react-query';
import { moviesApi } from '@/services/api/index.js';

const { fetchTrendingMovies, fetchPopularMovies } = moviesApi();

const useTrendingMovies = (time = 'week', lang = 'en-US') => {
  return useQuery({
    queryKey: ['trendingMovies', time, lang],
    queryFn: () => fetchTrendingMovies(time, lang),
  });
};

const usePopularMovies = (lang = 'en-US', page = 1, region) => {
  return useQuery({
    queryKey: ['popularMovies', lang, page, region],
    queryFn: () => fetchPopularMovies(lang, page, region),
  });
};

export const useMovies = () => {
  return {
    useTrendingMovies,
    usePopularMovies,
  };
};
