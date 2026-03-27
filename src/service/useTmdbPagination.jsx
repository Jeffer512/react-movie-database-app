import { useState, useEffect, useMemo } from 'react';
import { fetchTrending, fetchDiscover, fetchSearchResults, fetchSimilar } from './TmdbApi';

/**
 * Custom hook to handle complex pagination for the TMDb API.
 * 
 * The TMDb API returns 20 results per page. This hook manages those 20 results 
 * internally and "sub-paginates" them into smaller slices (5 or 10 items) 
 * to provide a smoother UI experience without redundant network requests.
 * 
 * @param {string} mediaType - 'movie', 'tv', or 'person'
 * @param {string} endpoint - 'trending', 'discover', 'search', or 'similar'
 * @param {string} genres - Comma-separated string of genre IDs
 * @param {string} query - The search term entered by the user
 * @param {number} id - The ID used for fetching 'similar' content
 * @returns {Object} - { data, nextPage, prevPage }
 */
export function useTMDbPagination(mediaType, endpoint, genres, query, id) {
  // --- INTERNAL STATE ---
  
  // fullData: Stores the complete array of 20 results returned by a single API call.
  const [fullData, setFullData] = useState([]);
  
  // page: Tracks the current page requested from the TMDb API.
  const [page, setPage] = useState(1);
  
  // index: Tracks the local offset within the 20 results (e.g., 0, 5, 10, or 15).
  const [index, setIndex] = useState(0);

  // n: The number of items to display at once. 
  // People and Similar lists use a smaller slice (5) for better layout.
  const n = (mediaType === 'person' || endpoint === 'similar') ? 5 : 10;

  // --- DATA FETCHING EFFECT ---
  
  useEffect(() => {
    // isActive: A flag to prevent "Race Conditions". 
    // If the user changes pages rapidly, only update the update state with the latest request.
    let isActive = true;

    const loadData = async () => {
      try {
        let response;
        
        // Route the request to the appropriate API service function
        if (endpoint === 'trending') {
          response = await fetchTrending(mediaType, page);
        } else if (endpoint === 'discover') {
          response = await fetchDiscover(mediaType, genres, page);
        } else if (endpoint === 'search' && query) {
          response = await fetchSearchResults(mediaType, query, page);
        } else if (endpoint === 'similar' && id) {
          response = await fetchSimilar(mediaType, id, page);
        }

        // Only update state if this specific effect run is still the most recent one
        if (isActive && response) {
          setFullData(response.results);
        }
      } catch (error) {
        if (isActive) {
          console.error("useTMDbPagination Error:", error);
        }
      }
    };

    loadData();

    // Cleanup: When the component re-renders or unmounts, mark the previous 
    // request as inactive so its result doesn't overwrite newer data.
    return () => {
      isActive = false;
    };
  }, [page, mediaType, endpoint, genres, id, query]);


  // --- STATE RESET EFFECT ---
  
  // If the user changes the search category or query, reset pagination
  // to the first page and first index.
  useEffect(() => {
    setIndex(0);
    setPage(1);
  }, [endpoint, query, genres, mediaType]);

  // --- PAGINATION LOGIC ---

  /**
   * Advances the view. If at the end of the current 20 results,
   * fetch the next page from the API.
   */
  const nextPage = () => {
    if (index < (20 - n)) {
      // Move forward within the current 20 results
      setIndex(prevIndex => prevIndex + n);
    } else {
      // Fetch a brand new page from the API and reset local index
      setPage(prevPage => prevPage + 1);
      setIndex(0);
    }
  };

  /**
   * Goes back in the view. If at the start of the current 20 results,
   * fetch the previous page from the API.
   */
  const prevPage = () => {
    // Prevent going before Page 1
    if (page === 1 && index === 0) return;

    if (index > 0) {
      // Move backward within the current 20 results
      setIndex(prevIndex => prevIndex - n);
    } else {
      // Fetch the previous page from the API and jump to the end of those results
      setPage(prevPage => prevPage - 1);
      setIndex(20 - n);
    }
  };

  // --- DERIVED STATE ---
  
  // slicedData: The actual subset of items (5 or 10) the component will render.
  // use useMemo to update slice when data or index changes and avoid unnecessary API calls when only the index change
  const slicedData = useMemo(() => {
    return fullData.slice(index, index + n);
  }, [fullData, index, n]);


  // --- EXPOSED API ---
  
  return { 
    data: slicedData, // The component sees only the current slice
    nextPage, 
    prevPage 
  };
}