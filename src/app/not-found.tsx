import { RouteError } from '@/components/routeError';

const NotFound = () => {
  return <RouteError currentError="Error 404: This page is not found" />;
};

export default NotFound;
