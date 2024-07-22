import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { moviesApi } from '@/services/api/index.js';

const defaultParameters = {
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
};

const {
  fetchPopularMovies,
  fetchSearchMovies,
  fetchMovieDetails,
  fetchMovieRecommendations,
  fetchMovieCredits,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchTrendingMovies,
} = moviesApi();

const useInfinitePopularMovies = (lang = 'en-US', page = 1, region = '') => {
  return useInfiniteQuery({
    queryKey: ['popularMovies', lang, page, region],
    queryFn: ({ pageParam = 1 }) => fetchPopularMovies(lang, pageParam, region),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    ...defaultParameters,
  });
};

const useInfiniteTopRatedMovies = (lang = 'en-US', page = 1, region = '') => {
  return useInfiniteQuery({
    queryKey: ['topRatedMovies', lang, page, region],
    queryFn: ({ pageParam = 1 }) => fetchTopRatedMovies(lang, pageParam, region),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    ...defaultParameters,
  });
};

const useInfiniteNowPlayingMovies = (lang = 'en-US', page = 1, region = '') => {
  return useInfiniteQuery({
    queryKey: ['nowPlayingMovies', lang, page, region],
    queryFn: ({ pageParam = 1 }) => fetchNowPlayingMovies(lang, pageParam, region),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    ...defaultParameters,
  });
};

const useInfiniteUpcomingMovies = (lang = 'en-US', page = 1, region = '') => {
  return useInfiniteQuery({
    queryKey: ['upcomingMovies', lang, page, region],
    queryFn: ({ pageParam = 1 }) => fetchUpcomingMovies(lang, pageParam, region),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
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
  return useInfiniteQuery({
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
    queryFn: ({ pageParam = 1 }) =>
      fetchSearchMovies(
        query,
        lang,
        pageParam,
        includeAdult,
        year,
        primaryReleaseYear,
        region
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    ...defaultParameters,
  });
};

const useTrendingMovies = (time = 'week', lang = 'en-US') => {
  return useQuery({
    queryKey: ['trendingMovies', time, lang],
    queryFn: () => fetchTrendingMovies(time, lang),
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

const useMovieCredits = (movieId, lang = 'en-US') => {
  return useQuery({
    queryKey: ['movieCredits', movieId, lang],
    queryFn: () => fetchMovieCredits(movieId, lang),
    ...defaultParameters,
  });
};

const useMovieRecommendations = (movieId, lang = 'en-US', page = 1) => {
  return useInfiniteQuery({
    queryKey: ['movieRecommendations', movieId, lang, page],
    queryFn: ({ pageParam = 1 }) =>
      fetchMovieRecommendations(movieId, lang, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    ...defaultParameters,
  });
};

export const useMovies = () => {
  return {
    useInfinitePopularMovies,
    useInfiniteTopRatedMovies,
    useInfiniteNowPlayingMovies,
    useInfiniteUpcomingMovies,
    useSearchMovies,
    useTrendingMovies,
    useMovieDetails,
    useMovieRecommendations,
    useMovieCredits,
  };
};
