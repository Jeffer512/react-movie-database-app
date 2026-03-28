import ResultsPage from "./ResultsPage";
import SearchComponent from "./SearchComponent";
import '../style/resultspage.css'

function Filter() {

  return(
    <div>
      <SearchComponent />
      <div className="container-resultPage">
        <ResultsPage />
      </div>
    </div>
  );
}

export default Filter;
