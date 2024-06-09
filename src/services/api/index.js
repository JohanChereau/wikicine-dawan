import { fetchTrendingMovies } from './actions/trendingMovies.js';
import { fetchPopularMovies } from './actions/popularMovies.js';
import { fetchSearchMovies } from './actions/searchMovies.js';
import { fetchMovieDetails } from './actions/movieDetails.js';
import { fetchMovieRecommendations } from './actions/movieRecommendations.js'; // Nouvelle importation

export const moviesApi = () => {
  const MOVIES_API_SECRET = import.meta.env.VITE_TMDB_SECRET;

  return {
    fetchTrendingMovies: (time, lang) =>
      fetchTrendingMovies(MOVIES_API_SECRET, time, lang),
    fetchPopularMovies: (lang, page, region) =>
      fetchPopularMovies(MOVIES_API_SECRET, lang, page, region),
    fetchSearchMovies: (
      query,
      lang,
      page,
      includeAdult,
      year,
      primaryReleaseYear,
      region
    ) =>
      fetchSearchMovies(
        MOVIES_API_SECRET,
        query,
        lang,
        page,
        includeAdult,
        year,
        primaryReleaseYear,
        region
      ),
    fetchMovieDetails: (movieId, lang, appendToResponse) =>
      fetchMovieDetails(MOVIES_API_SECRET, movieId, lang, appendToResponse),
    fetchMovieRecommendations: (movieId, lang, page) =>
      fetchMovieRecommendations(MOVIES_API_SECRET, movieId, lang, page), // Nouvelle fonction
  };
};
