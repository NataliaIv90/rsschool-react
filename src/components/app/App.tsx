import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
};

export default App;
