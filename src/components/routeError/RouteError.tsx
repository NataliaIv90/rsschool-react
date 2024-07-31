import React from 'react';
import { Button } from '../../shared/components/button/Button';

export type TRouteError = {
  currentError?: string | object;
};

export const RouteError: React.FC<TRouteError> = ({
  currentError,
}): React.JSX.Element => {
  return (
    <div className="route-error">
      <div className="route-error__content">
        <h1>Oops!</h1>
        <p>An unexpected error occurred.</p>
        {currentError ? <p>{JSON.stringify(currentError)}</p> : null}
        <a href="/">
          <Button text="Back to home" />
        </a>
      </div>
    </div>
  );
};
