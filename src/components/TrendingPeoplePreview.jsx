import { useNavigate } from 'react-router-dom';
import { useTMDbPagination } from '../service/useTmdbPagination';

import '../style/sectionCard.css'; // Asegúrate de importar el archivo CSS
import '../style/button.css';

/**
 * Renders a preview section for trending people with pagination.
 */
const TrendingPeoplePreview = () => {
  const navigate = useNavigate();

  // Use custom hook to handle data fetching and pagination state
  // Rename 'data' to 'people' for clarity within this component
  const {data: people, nextPage, prevPage} = useTMDbPagination('person', 'trending');
  
  return (
    <div id="trendingPeoplePreview">
      <div className="trendingPreview-container">
        <h2 >Trending People Today</h2>
        <div className="trendingPreview-movieList">
          {people.slice(0,5).map((person) => (
            <div key={person.id} className="persson-container">
              <img
                className="persson-img"
                src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                alt={person.name}
                // Navigate using URL parameters; Details page will extract ID and type from the path
                onClick={() => (navigate(`/person/${person.id}/${person.name}`))}
              />
              <h3>{person.name}</h3>
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

export default TrendingPeoplePreview;

