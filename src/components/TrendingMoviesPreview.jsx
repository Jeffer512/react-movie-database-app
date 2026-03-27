import { useNavigate } from 'react-router-dom';
import { useTMDbPagination } from '../hooks/useTmdbPagination';

import '../style/button.css';
import '../style/sectionCard.css';

/**
 * Renders a preview section for trending movies with pagination.
 */
const TrendingMoviesPreview = () => {
  const navigate = useNavigate();

  // Use custom hook to handle data fetching and pagination state
  // Rename 'data' to 'movies' for clarity within this component
  const {data: movies, nextPage, prevPage} = useTMDbPagination('movie', 'trending');

  return (
    <div id="trendingPreview">
      <div className="trendingPreview-container">
      <h2 className='trending-movies-text'>Trending Movies Today</h2>
        <div className="trendingPreview-movieList">
          {movies.slice(0, 10).map((movie) => (
            <div key={movie.id} className="movie-container">
              <img
                className="movie-img"
                src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                alt={movie.title}
                // Navigate using URL parameters; Details page will extract ID and type from the path
                onClick={() => (navigate(`/movie/${movie.id}/${movie.title}`))}
              />
              <p>{movie.title}</p>
              <p>{movie.vote_average}</p>
            </div>
          ))}
        </div> 
      </div>
      <div className='next-previous-container'>  
        <button className="previous-page" onClick={prevPage}>Previous</button>
        <button className="next-page" onClick={nextPage}>Next</button>
      </div>  
    </div>
  );
};

export default TrendingMoviesPreview;
