import { fetchFromApi } from '../fetchUtils.js';

export const fetchMovieCredits = async (apiKey, movieId, lang = 'en-US') => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const params = {
    api_key: apiKey,
    language: lang,
  };
  return await fetchFromApi(url, params);
};
