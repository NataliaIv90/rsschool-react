import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader } from '../../shared/components/loader/Loader';
import { Button } from '../../shared/components/button/Button';
import { useGetCharacterDataQuery } from '../../redux/slices/starWarsApiSlice';
import { RouteError } from '../routeError/RouteError';
import { CardWrapper } from './CardWrapper';

export const DetailedView: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = {
    page: searchParams.get('page') || '1',
    id: searchParams.get('id') || '',
  };

  const {
    data: character,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetCharacterDataQuery({
    id: params.id,
  });

  const handleClose = () => {
    navigate(`/?page=${params.page}`);
  };

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (!character || !params.id) {
    return (
      <div>
        <p>No character found.</p>
        <Button text="Close" onClick={handleClose} />
      </div>
    );
  }

  if (isError) {
    return <RouteError currentError={error} />;
  }

  return <CardWrapper character={character} handleClose={handleClose} />;
};
