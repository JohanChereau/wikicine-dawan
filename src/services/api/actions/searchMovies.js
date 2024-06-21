import { fetchFromApi } from '../fetchUtils.js';

export const fetchSearchMovies = async (
  apiKey,
  query,
  lang = 'en-US',
  page = 1,
  includeAdult = false,
  year,
  primaryReleaseYear,
  region
) => {
  const url = `https://api.themoviedb.org/3/search/movie`;
  const params = {
    api_key: apiKey,
    query: query,
    language: lang,
    page: page,
    include_adult: includeAdult,
    year: year,
    primary_release_year: primaryReleaseYear,
    region: region,
  };
  return await fetchFromApi(url, params);
};
