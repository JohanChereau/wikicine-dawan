import { fetchFromApi } from '../fetchUtils.js';

export const fetchPopularMovies = async (
  apiKey,
  lang = 'en-US',
  page = 1,
  region
) => {
  const url = 'https://api.themoviedb.org/3/movie/popular';
  const params = {
    api_key: apiKey,
    language: lang,
    page,
    region,
  };
  return await fetchFromApi(url, params);
};
