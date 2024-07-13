import { createBrowserRouter } from 'react-router-dom';
import App from '../components/app/App';
import { SearchPage } from '../components/searchPage/SearchPage';
import { RouteError } from '../components/routeError/RouteError';

export const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    errorElement: <RouteError />,
    children: [
      {
        element: <SearchPage />,
        path: '/',
      },
    ],
  },
]);
