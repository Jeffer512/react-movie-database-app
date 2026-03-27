import { useNavigate } from 'react-router-dom';
import { useTMDbPagination } from '../service/useTmdvPagination';

import '../style/button.css';
import '../style/sectionCard.css';

/**
 * Renders a preview section for trending TV shows with pagination.
 */
const TrendingTVPreview = () => {
  const navigate = useNavigate();
  
  // Use custom hook to handle data fetching and pagination state
  // Rename 'data' to 'tvShows' for clarity within this component
  const { data: tvShows, nextPage, prevPage } = useTMDbPagination('tv', 'trending');
  
  return (
    <div id="trendingTvPreview">
      <div className="trendingPreview-container">
        <h2 className='trending-movies-text'>Trending TV Shows Today</h2>
        
        <div className="trendingPreview-movieList">
          {tvShows.map((tvShow) => (
            <div key={tvShow.id} className="movie-container">
              <img
                className="movie-img"
                src={`https://image.tmdb.org/t/p/w300${tvShow.poster_path}`}
                alt={tvShow.name}
                // Navigate using URL parameters; Details page will extract ID and type from the path
                onClick={() => navigate(`/tv/${tvShow.id}/${tvShow.name}`)}
              />
              <p>{tvShow.name}</p>
              <p>{tvShow.vote_average}</p>
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

export default TrendingTVPreview;