import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../context/stateContext";
import GenreFilter from "./GenreFilter";
import "../style/resultspage.css";
import { useTMDbPagination } from "../hooks/useTmdbPagination";

/**
 * ResultsPage Component
 * Displays a paginated grid of media results based on search queries or genre discovery.
 * Logic is driven by URL parameters (type, searchValue) and global context (endpoint).
 */
function ResultsPage() {
  const navigate = useNavigate();

  // Extract media type (movie/tv) and search term directly from the URL
  const { type, searchValue } = useParams();
  
  // Local state for selected genre IDs (stored as a comma-separated string)
  const [genre, setGenre] = useState("");

  const { setQuery, endpoint } = useStateContext();

  // Initialize the custom pagination hook. 
  // It reacts to changes in type, endpoint, genre, or the search value from the URL.
  const { data, nextPage, prevPage } = useTMDbPagination(type, endpoint, genre, searchValue);

  return (
    <>
      {/* Component to handle genre selection logic */}
      <GenreFilter genre={genre} setGenre={setGenre} />
      
      <div className="container">
        <div className="container-carrusel">
          <div className="Movie">
            {data.map((element) => (
              <div key={element.id} className="">
                <img
                  className="movie-images"
                  src={
                    `https://image.tmdb.org/t/p/w300${element.poster_path}` +
                    `https://image.tmdb.org/t/p/w300${element.profile_path}`
                  }
                  alt={element.title || element.name}
                  onClick={() => (
                    // Clear global search query and navigate to specific details page
                    setQuery(''),
                    navigate(`/${type}/${element.id}/${element.title || element.name}`)
                  )}
                />
                <div className="info-container">
                  <h3>{element.title || element.name}</h3>
                  <p>{element.release_date || element.first_air_date}</p>
                </div>
                <p className="title">{element.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="next-previous-container">
          <button className="previous-page" onClick={prevPage}>
            Previous
          </button>
          <button className="next-page" onClick={nextPage}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
  
export default ResultsPage;