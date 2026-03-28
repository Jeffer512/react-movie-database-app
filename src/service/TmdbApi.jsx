import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Axios instance configured with base URL and API key for TMDb.
 */
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

/**
 * Search for movies, TV shows, or people by a text query.
 * @param {string} type - The category to search ('movie', 'tv', 'person').
 * @param {string} query - The search term.
 * @param {number} page - The page number for pagination.
 * @returns {Promise<Object>} The API response data.
 */
export const fetchSearchResults = async (type, query, page) => {
  try {
    const response = await tmdbApi.get(`/search/${type}`, {
      params: { 
        page,
        query,
        include_adult: false,
        language: 'es-ES'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};

/**
 * Discover media filtered by specific genre IDs.
 * @param {string} type - Media type ('movie' or 'tv').
 * @param {string} genres - Comma-separated string of genre IDs.
 * @param {number} page - The page number.
 */
export const fetchDiscover = async (type, genres, page) => {
  try {
    const response = await tmdbApi.get(`/discover/${type}`, {
      params: { 
        page,
        include_adult: false,
        language: 'es-ES',
        with_genres: genres
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${type} results:`, error);
    throw error;
  }
}

/**
 * Fetch the daily trending items for a specific media type.
 * @param {string} type - Media type ('movie', 'tv', or 'person').
 * @param {number} page - The page number.
 */
export const fetchTrending = async (type, page) => {
  try {
    const response = await tmdbApi.get(`/trending/${type}/day`, {
      params: { 
        page,
        include_adult: false,
        language: 'es-ES'
    }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching trending ${type} results:`, error);
    throw error;
  }
};

/**
 * Fetch detailed information for a specific movie, show, or person.
 * @param {string} searchType - 'movie', 'tv', or 'person'.
 * @param {number|string} id - The unique TMDb ID.
 */
export const fetchDetails = async (searchType, id) => {
  try {
    const response = await tmdbApi.get(`/${searchType}/${id}`)
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${searchType} results:`, error);
    throw error;
  }
}

/**
 * Fetch a list of similar media items based on a specific ID.
 * @param {string} searchType - 'movie' or 'tv'.
 * @param {number|string} id - The unique TMDb ID.
 * @param {number} page - The page number.
 */
export const fetchSimilar = async (searchType, id, page) => {
  try {
    const response = await tmdbApi.get(`/${searchType}/${id}/similar`, {
      params: {
        page
      }
    })
    return response.data;
  } catch (error) {
    console.error(`Error fetching similar ${searchType}:`, error);
    throw error;
  }
}