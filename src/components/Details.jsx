import { useState, useEffect } from 'react';
import SearchComponent from "./SearchComponent";
import { useTMDbPagination } from "../hooks/useTmdbPagination";
import { fetchDetails } from "../service/TmdbApi";
import '../style/details.css';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/sectionCard.css';

function Details() {
  const navigate = useNavigate();

  const [information, setInformation] = useState(null);

  const { searchType, ID } = useParams();

  const { data : recomendations, nextPage, prevPage } = useTMDbPagination(searchType, 'similar', '', '', ID);
  
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

  const getImageUrl = (path) => {
    if (!path) {
      return '';
    }
    return `https://image.tmdb.org/t/p/w400${path}`;
  };

  return (
    <div className="details">
      <SearchComponent />
      {information && (
        <div className="details-container">
          <div>
            <h1>{information.title || information.name}</h1>
            <img src={getImageUrl(information.poster_path) || getImageUrl(information.profile_path)} alt={information.id} />
            
            <p>{information.overview}</p>
          </div>
          <div className="genres">
          {searchType !== "person" && (<h3>Géneros:</h3>)}
            {information.genres && information.genres.map((genre, index) => (
              <p key={index}>{genre.name}</p>
            ))}

          </div>
          
          {searchType === "person" && (
            <div>
              <h2>Detalles</h2>
              {information.biography && <p><strong>Biografía:</strong> {information.biography}</p>}
              {information.birthday && <p><strong>Fecha de nacimiento:</strong> {information.birthday}</p>}
              {information.deathday && <p><strong>Fecha de muerte:</strong> {information.deathday}</p>}
              {
                information.also_known_as ? (
                  <div className="genres">
                    <h2>Also known as</h2>
                    {information.also_known_as.map((element) => (
                      <p>{element}</p>
                    ))}
                  </div>
                ) : (
                  ""
                )
              }

            </div>
          )}
        </div>
      )}
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
                      alt={recomendation.title}
                      onClick={() => (navigate(`/${searchType}/${recomendation.id}/${recomendation.title || recomendation.name}`))}
                    />
                    <p>{recomendation.title || recomendation.name}</p>
                    <p>{recomendation.vote_average}</p>
                  </div>
                ))}
          </div>
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

