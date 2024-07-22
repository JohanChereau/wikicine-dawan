import { fetchFromApi } from '../fetchUtils.js';

export const fetchTopRatedMovies = async (
  apiKey,
  lang = 'en-US',
  page = 1,
  region
) => {
  const url = 'https://api.themoviedb.org/3/movie/top_rated';
  const params = {
    api_key: apiKey,
    language: lang,
    page,
    region,
  };
  return await fetchFromApi(url, params);
};
