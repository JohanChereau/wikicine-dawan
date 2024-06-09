import { useQuery } from '@tanstack/react-query';
import { moviesApi } from '@/services/api/index.js';

const defaultParameters = {
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
};

const {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchSearchMovies,
  fetchMovieDetails,
  fetchMovieRecommendations,
} = moviesApi();

const useTrendingMovies = (time = 'week', lang = 'en-US') => {
  return useQuery({
    queryKey: ['trendingMovies', time, lang],
    queryFn: () => fetchTrendingMovies(time, lang),
    ...defaultParameters,
  });
};

const usePopularMovies = (lang = 'en-US', page = 1, region = '') => {
  return useQuery({
    queryKey: ['popularMovies', lang, page, region],
    queryFn: () => fetchPopularMovies(lang, page, region),
    ...defaultParameters,
  });
};

const useSearchMovies = (
  query,
  lang = 'en-US',
  page = 1,
  includeAdult = false,
  year,
  primaryReleaseYear,
  region
) => {
  return useQuery({
    queryKey: [
      'searchMovies',
      query,
      lang,
      page,
      includeAdult,
      year,
      primaryReleaseYear,
      region,
    ],
    queryFn: () =>
      fetchSearchMovies(
        query,
        lang,
        page,
        includeAdult,
        year,
        primaryReleaseYear,
        region
      ),
    ...defaultParameters,
  });
};

const useMovieDetails = (movieId, lang = 'en-US', appendToResponse = '') => {
  return useQuery({
    queryKey: ['movieDetails', movieId, lang, appendToResponse],
    queryFn: () => fetchMovieDetails(movieId, lang, appendToResponse),
    ...defaultParameters,
  });
};

const useMovieRecommendations = (movieId, lang = 'en-US', page = 1) => {
  return useQuery({
    queryKey: ['movieRecommendations', movieId, lang, page],
    queryFn: () => fetchMovieRecommendations(movieId, lang, page),
    ...defaultParameters,
  });
};

export const useMovies = () => {
  return {
    useTrendingMovies,
    usePopularMovies,
    useSearchMovies,
    useMovieDetails,
    useMovieRecommendations,
  };
};
