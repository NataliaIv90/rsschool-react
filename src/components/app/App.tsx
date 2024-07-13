import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { SearchPage } from '../searchPage/SearchPage';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <ErrorBoundary>
        <SearchPage />
      </ErrorBoundary>
    </div>
  );
};

export default App;
