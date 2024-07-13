import { createBrowserRouter } from 'react-router-dom';
import App from '../components/app/App';
import { SearchPage } from '../components/searchPage/SearchPage';

export const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    children: [
      {
        element: <SearchPage />,
        path: '/',
      },
    ],
  },
]);
