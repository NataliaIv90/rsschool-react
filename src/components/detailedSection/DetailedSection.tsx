import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetCharacterDataQuery } from '../../redux/slices/starWarsApiSlice';
import { RouteError } from '../routeError/RouteError';
import { CardWrapper } from './CardWrapper';
import { useLoading } from '../../shared/hooks/useLoading';

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

  useLoading(isLoading, isFetching);

  if (isError) {
    return <RouteError currentError={error} />;
  }

  return <CardWrapper character={character} handleClose={handleClose} />;
};
