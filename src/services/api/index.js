import { fetchPopularMovies } from './actions/popularMovies.js';
import { fetchSearchMovies } from './actions/searchMovies.js';
import { fetchMovieDetails } from './actions/movieDetails.js';
import { fetchMovieRecommendations } from './actions/movieRecommendations.js';
import { fetchMovieCredits } from './actions/movieCredits.js';
import { fetchTopRatedMovies } from './actions/topRatedMovies.js';
import { fetchNowPlayingMovies } from './actions/nowPlayingMovies.js';
import { fetchUpcomingMovies } from './actions/upcomingMovies.js';
import { fetchTrendingMovies } from './actions/trendingMovies.js';

export const moviesApi = () => {
  const MOVIES_API_SECRET = import.meta.env.VITE_TMDB_SECRET;

  return {
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
      fetchMovieRecommendations(MOVIES_API_SECRET, movieId, lang, page),
    fetchMovieCredits: (movieId, lang) =>
      fetchMovieCredits(MOVIES_API_SECRET, movieId, lang),
    fetchTopRatedMovies: (lang, page, region) =>
      fetchTopRatedMovies(MOVIES_API_SECRET, lang, page, region),
    fetchNowPlayingMovies: (lang, page, region) =>
      fetchNowPlayingMovies(MOVIES_API_SECRET, lang, page, region),
    fetchUpcomingMovies: (lang, page, region) =>
      fetchUpcomingMovies(MOVIES_API_SECRET, lang, page, region),
    fetchTrendingMovies: (time, lang) =>
      fetchTrendingMovies(MOVIES_API_SECRET, time, lang),
  };
};
