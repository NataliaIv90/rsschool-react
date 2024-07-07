import { Component } from 'react';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import SearchPage from '../searchPage/SearchPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <SearchPage />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
