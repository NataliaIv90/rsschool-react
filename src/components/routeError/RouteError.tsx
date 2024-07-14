import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

export const RouteError = () => {
  const error = useRouteError();
  let message = 'An unknown error occurred';

  if (error instanceof Error) {
    message = error.message;
  } else if (isRouteErrorResponse(error)) {
    message = error.statusText || JSON.stringify(error.data);
  }

  console.error(error);

  return (
    <div className="route-error">
      <div className="route-error__content">
        <h1>Oops!</h1>
        <p>{message}</p>
        <Link to="/">
          <button className="btn">Back to home</button>
        </Link>
      </div>
    </div>
  );
};
