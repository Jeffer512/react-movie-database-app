import { useEffect } from "react";
import { useStateContext } from "../context/stateContext";

// Static list of genres supported by the TMDb API
const constant_genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

/**
 * GenreFilter Component
 * Provides a dropdown to select genres and displays currently active filters.
 */
const GenreFilter = ({ genre, setGenre }) => {
  const { endpoint, setEndpoint } = useStateContext();

  /**
   * Handle genre selection.
   * Toggles the genre ID in the comma-separated string and switches endpoint to 'discover'.
   */
  const handleSelect = (e) => {
      const val = e.target.value;
      if (genre.includes(val + ",")) {
        setGenre(genre.replace(val + ",", ""));
        return;
      }
      setGenre(genre + val + ",");
      setEndpoint('discover');
  };

  /**
   * Effect: Clear selected genres if the user switches to a non-discovery endpoint 
   * (e.g., performing a new text search).
   */
  useEffect(() => {
    if (endpoint !== 'discover') {
      setGenre('');
    }
  }, [endpoint, setGenre]);
  
  return(
      <div className='select-genders'>
          <h2>Seleccione el genero</h2>
          <select onChange={handleSelect}>
            {constant_genres.map((element) => (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            ))}
          </select>

          <span> Generos seleccionados: </span>
          <div>
            {/* Parse the genre string and map IDs back to human-readable names */}
            {genre.split(",").map((element) => {
                if (endpoint !== 'discover' || element === "") {
                  return null;
                }
                const foundGenre = constant_genres.find((g) => g.id === parseInt(element));
                return (
                  <p key={element}>
                    {foundGenre ? foundGenre.name : ''}
                  </p>
                );
              })
            }
          </div>
      </div>
  );
};

export default GenreFilter;