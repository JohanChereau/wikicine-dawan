import { fetchFromApi } from '../fetchUtils.js';

export const fetchTrendingMovies = async (apiKey, time = 'week', lang = 'en-US') => {
  const url = `https://api.themoviedb.org/3/trending/movie/${time}`;
  const params = {
    api_key: apiKey,
    language: lang,
  };
  return await fetchFromApi(url, params);
};
