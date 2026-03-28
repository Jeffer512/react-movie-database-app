import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../context/stateContext";
import GenreFilter from "./GenreFilter";
import "../style/resultspage.css";
import { useTMDbPagination } from "../hooks/useTmdbPagination";

function ResultsPage() {
  const navigate = useNavigate();

  const { type, searchValue } = useParams();
  
  const [genre, setGenre] = useState("");

  const { query, setQuery, endpoint, setEndpoint } = useStateContext();

  const { data, nextPage, prevPage } = useTMDbPagination(type, endpoint, genre, searchValue);

  return (
    <>
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
                  alt={element.title}
                  onClick={() => (
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
