import { useState, useEffect } from 'react';
import SearchComponent from "./SearchComponent";
import { useTMDbPagination } from "../hooks/useTmdbPagination";
import { fetchDetails } from "../service/TmdbApi";
import '../style/details.css';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/sectionCard.css';

/**
 * Renders a comprehensive details page for a specific movie, TV show, or person.
 * 
 * This component utilizes URL parameters to drive its data-fetching logic,
 * coordinating between a direct API call for primary details and a custom 
 * pagination hook for related/similar content.
 */
function Details() {
  const navigate = useNavigate();

  // information: Stores the primary metadata for the entity (Movie, TV, or Person)
  const [information, setInformation] = useState(null);

  // Extract entity type and unique ID directly from the URL path
  const { searchType, ID } = useParams();

  /**
   * Initialize the pagination hook for 'similar' content.
   * Renames 'data' to 'recomendations' for clarity within this component.
   */
  const { data: recomendations, nextPage, prevPage } = useTMDbPagination(searchType, 'similar', '', '', ID);

  /**
   * Fetch primary entity details.
   * Re-runs whenever the ID or searchType in the URL changes.
   */
  useEffect(() => {
    const getDetails = async () => {
      try {
        const data = await fetchDetails(searchType, ID);
        setInformation(data);
      } catch (error) {
        console.error("Failed to fetch details:", error);
      }
    };

    getDetails();
  }, [ID, searchType]);

  /**
   * Construct a full TMDb image URL.
   * @param {string} path - The partial image path provided by the API.
   * @returns {string} The absolute URL for the image or an empty string if no path exists.
   */
  const getImageUrl = (path) => {
    if (!path) return '';
    return `https://image.tmdb.org/t/p/w400${path}`;
  };

  return (
    <div className="details">
      <SearchComponent />

      {/* Main Information Section */}
      {information && (
        <div className="details-container">
          <div>
            <h1>{information.title || information.name}</h1>
            <img 
              src={getImageUrl(information.poster_path) || getImageUrl(information.profile_path)} 
              alt={information.id} 
            />
            <p>{information.overview}</p>
          </div>

          {/* Genre Tags: Hidden for 'person' type */}
          <div className="genres">
            {searchType !== "person" && (<h3>Géneros:</h3>)}
            {information.genres && information.genres.map((genre, index) => (
              <p key={index}>{genre.name}</p>
            ))}
          </div>

          {/* Person-Specific Metadata: Biography and known aliases */}
          {searchType === "person" && (
            <div>
              <h2>Detalles</h2>
              {information.biography && <p><strong>Biografía:</strong> {information.biography}</p>}
              {information.birthday && <p><strong>Fecha de nacimiento:</strong> {information.birthday}</p>}
              {information.deathday && <p><strong>Fecha de muerte:</strong> {information.deathday}</p>}
              {information.also_known_as && (
                <div className="genres">
                  <h2>Also known as</h2>
                  {information.also_known_as.map((element, idx) => (
                    <p key={idx}>{element}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Related Content Section: Hidden for 'person' type or if no results are found */}
      {searchType !== "person" && recomendations.length > 0 && (
        <div className='movies-related'>
          <h1>
            {searchType === 'movie' ? 'Películas relacionadas' : 'Series relacionadas'}
          </h1>
          <div className="trendingPreview-movieList">
            {recomendations.map((recomendation) => (
              <div key={recomendation.id} className="movie-container">
                <img
                  className="movie-img"
                  src={`https://image.tmdb.org/t/p/w300${recomendation.backdrop_path}`}
                  alt={recomendation.title || recomendation.name}
                  onClick={() => navigate(`/${searchType}/${recomendation.id}/${recomendation.title || recomendation.name}`)}
                />
                <p>{recomendation.title || recomendation.name}</p>
                <p>{recomendation.vote_average}</p>
              </div>
            ))}
          </div>
          
          {/* Pagination Controls for Related Content */}
          <div className='next-previous-container'>  
            <button className="previous-page" onClick={prevPage}>Previous</button>
            <button className="next-page" onClick={nextPage}>Next</button>
          </div>     
        </div>
      )}
    </div>
  );
}

export default Details;