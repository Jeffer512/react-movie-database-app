import { useEffect } from "react";
import { useStateContext } from "../context/stateContext";


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

const GenreFilter = ({ genre, setGenre }) => {

  const { endpoint, setEndpoint } = useStateContext();

  const handleSelect = (e) => {
      if (genre.includes(e.target.value + ",")) {
        setGenre(genre.replace(e.target.value + ",", ""));
        return;
      }
      setGenre(genre + e.target.value + ",");
      setEndpoint('discover')
  };

  useEffect(() => {
    if (endpoint !== 'discover') {
      setGenre('');
    }
  }, [endpoint])
  
  return(
      <div className='select-genders'>
          {/* Selection para seleccionar el genero */}
          <h2>Seleccione el genero</h2>
          <select onClick={handleSelect}>
            {constant_genres.map((element) => (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            ))}
          </select>
          <span> Generos seleccionados: </span>
          {/* // imprimir genero seleccionado, no por numero si no por nombre */}
          <div>
            {genre.split(",").map((element) => {
                if (endpoint !== 'discover') {
                  return;
                }
                if (element === "") {
                  return;
                }
                return (
                  <p key={element}>
                    {
                      constant_genres.find((genre) => genre.id === parseInt(element))
                        .name
                    }
                  </p>
                );
              })
            }
          </div>
      </div>
  );
};

export default GenreFilter;
