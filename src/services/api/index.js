import { fetchTrendingMovies } from './actions/trendingMovies.js';
import { fetchPopularMovies } from './actions/popularMovies.js';

export const moviesApi = () => {
  const MOVIES_API_SECRET = import.meta.env.VITE_TMDB_SECRET;

  return {
    fetchTrendingMovies: (time, lang) =>
      fetchTrendingMovies(MOVIES_API_SECRET, time, lang),
    fetchPopularMovies: (lang, page, region) =>
      fetchPopularMovies(MOVIES_API_SECRET, lang, page, region),
  };
};
