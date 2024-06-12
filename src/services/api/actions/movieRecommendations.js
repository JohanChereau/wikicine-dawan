import { fetchFromApi } from '../fetchUtils.js';

export const fetchMovieRecommendations = async (
  apiKey,
  movieId,
  lang = 'en-US',
  page = 1
) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations`;
  const params = {
    api_key: apiKey,
    language: lang,
    page: page,
  };
  return await fetchFromApi(url, params);
};
