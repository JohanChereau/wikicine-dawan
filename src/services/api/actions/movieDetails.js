import { fetchFromApi } from '../fetchUtils.js';

export const fetchMovieDetails = async (
  apiKey,
  movieId,
  lang = 'en-US',
  appendToResponse = ''
) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}`;
  const params = {
    api_key: apiKey,
    language: lang,
    append_to_response: appendToResponse,
  };
  return await fetchFromApi(url, params);
};
