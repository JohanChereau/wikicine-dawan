export const fetchFromApi = async (url, params = {}) => {
  try {
    const urlWithParams = new URL(url);
    Object.keys(params).forEach((key) =>
      urlWithParams.searchParams.append(key, params[key])
    );

    const response = await fetch(urlWithParams);
    if (!response.ok) {
      throw new Error('Fetch error: ' + response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error('Error during fetching:', error);
    throw error;
  }
};
