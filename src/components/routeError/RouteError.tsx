import React from 'react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import { Button } from '../../shared/components/button/Button';

export type TRouteError = {
  currentError?: string | object;
};

export const RouteError: React.FC<TRouteError> = ({
  currentError,
}): React.JSX.Element => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="route-error">
      <div className="route-error__content">
        <h1>Oops!</h1>
        <p>An unexpected error occurred.</p>
        {isRouteErrorResponse(error) ? <p>{error.statusText}</p> : null}
        {currentError ? <p>{JSON.stringify(currentError)}</p> : null}
        <Link to="/">
          <Button text="Back to home" />
        </Link>
      </div>
    </div>
  );
};
