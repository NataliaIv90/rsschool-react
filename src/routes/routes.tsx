import { createBrowserRouter } from 'react-router-dom';
import App from '../components/app/App';
import { DetailedView } from '../components/detailedSection/DetailedSection';
import { RouteError } from '../components/routeError/RouteError';

export const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    errorElement: <RouteError />,
    children: [
      {
        element: <DetailedView />,
        path: '/details/:name',
      },
    ],
  },
]);
