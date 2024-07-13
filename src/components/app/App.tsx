import { Outlet } from 'react-router-dom';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

export default App;
