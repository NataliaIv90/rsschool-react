import { Component } from 'react';
import SearchInput from '../searchInput/SearchInput';
import SearchResults from '../searchResults/SearchResults';

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

interface SearchPageState {
  searchTerm: string;
  results: IStarWarsCharacter[];
  isLoading: boolean;
}

class SearchPage extends Component<unknown, SearchPageState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    const storedSearchTerm = localStorage.getItem('searchTerm');
    if (storedSearchTerm) {
      this.setState({ searchTerm: storedSearchTerm }, this.fetchResults);
    }
  }

  handleSearchTermChange = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  handleSearch = () => {
    this.fetchResults();
    localStorage.setItem('searchTerm', this.state.searchTerm.trim());
  };

  fetchResults = () => {
    const { searchTerm } = this.state;
    const apiUrl = `https://swapi.dev/api/people/?search=${searchTerm}`;

    this.setState({ isLoading: true });

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ results: data.results, isLoading: false });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { searchTerm, results, isLoading } = this.state;

    return (
      <div>
        <SearchInput
          searchTerm={searchTerm}
          onSearchTermChange={this.handleSearchTermChange}
          onSearch={this.handleSearch}
          isLoading={isLoading}
        />
        {isLoading ? <p>Loading...</p> : <SearchResults results={results} />}
      </div>
    );
  }
}

export default SearchPage;
