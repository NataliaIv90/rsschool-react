import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import { Button } from '../../shared/components/button/Button';

export const RouteError = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="route-error">
      <div className="route-error__content">
        <h1>Oops!</h1>
        <p>An unexpected error occurred.</p>
        <p>
          {isRouteErrorResponse(error)
            ? error.statusText
            : JSON.stringify(error)}
        </p>
        <Link to="/">
          <Button text="Back to home" />
        </Link>
      </div>
    </div>
  );
};
