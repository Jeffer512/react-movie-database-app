import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchSearchResults } from '../service/TmdbApi';
import { useStateContext } from '../context/stateContext';
import '../style/Search.css';
import { CiHome } from "react-icons/ci";

/**
 * SearchComponent
 * Handles the search input, debounced API calls for the dropdown suggestions,
 * and navigation to the results or details pages.
 */
const SearchComponent = () => {
  const navigate = useNavigate();
  const { type, search } = useParams();

  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const { searchType, setSearchType, query, setQuery, setEndpoint } = useStateContext();

  // Sync local searchType with URL parameters if they change
  useEffect(() => {
    if (type) setSearchType(type);
  }, [type, setSearchType]);

  // Sync local query with URL search parameters
  useEffect(() => {
    setQuery(search || "");
  }, [search, setQuery]);

  /**
   * Debounce Logic:
   * Instead of calling the API on every keystroke, we wait for the user to stop 
   * typing for 300ms. This reduces server load and improves performance.
   */
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query) {
        try {
          const data = await fetchSearchResults(searchType, query);
          setResults(data.results.slice(0, 5)); // Show top 5 suggestions
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);

    // Cleanup: Clear the timeout if the user types again before 300ms
    return () => clearTimeout(delayDebounceFn);
  }, [query, searchType]);

  /**
   * Handle full search submission (Enter key or Search button)
   */
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === '') return;

    setShowDropdown(false);
    // Set endpoint to 'search' to ensure ResultsPage uses the correct API logic
    setEndpoint('search');
    navigate(`/search/${searchType}/${query}`);
  };

  /**
   * Handle clicking a specific result from the dropdown
   */
  const handleResultClick = (result) => {
    setShowDropdown(false);
    setQuery(''); // Clear search bar after selection
    
    // Navigate to the specific details page
    navigate(`/${searchType}/${result.id}/${result.title || result.name}`);
  };

  return (
    <div className="search-container">
      <Link to={'/'}><CiHome onClick={() => setQuery("")} className='home-icon' /></Link>
        <form onSubmit={handleSearch}>
          <div>
            <select className='select-button' value={searchType} onChange={(e) => setSearchType(e.target.value)}>
              <option value="movie">Películas</option>
              <option value="tv">TV Shows</option>
              <option value="person">Personas</option>
            </select>
          </div>
          <div className='input-button-container'>
            <input className='input-search'
              type="text" 
              value={query} 
              onChange={(e) => {setQuery(e.target.value); setShowDropdown(true);}} 
              placeholder="Buscar..."
            />
          </div>
        </form>

        {/* Search Suggestions Dropdown */}
        {showDropdown && results.length > 0 && (
          <ul className="search-dropdown">
            {results.map(result => (
              <li key={result.id} onClick={() => handleResultClick(result)}>
                  <img className="search-dropdown-image"
                    src={`https://image.tmdb.org/t/p/w200${result.poster_path || result.profile_path}`}
                    alt={result.title || result.name}
                  />
                {result.title || result.name}
                {searchType === 'person' && result.known_for_department && ` - ${result.known_for_department}`}
                {(searchType === 'movie' || searchType === 'tv') && result.release_date && ` (${result.release_date.split('-')[0]})`}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

export default SearchComponent;