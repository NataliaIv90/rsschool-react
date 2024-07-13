import { Component } from 'react';
import SearchInput from '../searchInput/SearchInput';
import SearchResults from '../searchResults/SearchResults';
import { Pagination } from '../pagination/Pagination';
import { Loader } from '../../shared/loader/Loader';

interface SearchPageState {
  searchTerm: string;
  results: IStarWarsCharacter[];
  isLoading: boolean;
  count: number;
  currentPage: number;
}

export interface IStarWarsCharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

class SearchPage extends Component<unknown, SearchPageState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
      isLoading: true,
      count: 1,
      currentPage: 1,
    };
  }

  componentDidMount() {
    const storedSearchTerm = localStorage.getItem('searchTerm');
    if (storedSearchTerm) {
      this.setState({ searchTerm: storedSearchTerm }, this.fetchResults);
    } else {
      this.fetchResults();
    }
  }

  handleSearchTermChange = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  handleSearch = () => {
    this.handlePageChange(1);
    this.fetchResults();
    localStorage.setItem('searchTerm', this.state.searchTerm.trim());
  };

  handlePageChange = async (currentPage: number) => {
    await this.setState({ currentPage });
    await this.fetchResults();
  };

  fetchResults = () => {
    const { searchTerm, currentPage } = this.state;
    let apiUrl = `https://swapi.dev/api/people/?page=${currentPage}`;
    if (searchTerm) {
      apiUrl += `&search=${searchTerm}`;
    }
    this.setState({ isLoading: true });

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          results: data.results,
          isLoading: false,
          count: data.count,
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { searchTerm, results, isLoading, count, currentPage } = this.state;

    return (
      <div className="search-page">
        <SearchInput
          searchTerm={searchTerm}
          onSearchTermChange={this.handleSearchTermChange}
          onSearch={this.handleSearch}
          isLoading={isLoading}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <SearchResults results={results} />
            <Pagination
              count={count}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </>
        )}
      </div>
    );
  }
}

export default SearchPage;
