import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

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


export const fetchDetails = async (searchType, id) => {
  try {
    const response = await tmdbApi.get(`/${searchType}/${id}`)
    return response.data;

  } catch (error) {
    console.error(`Error fetching ${searchType} results:`, error);
    throw error;
  }
}

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
