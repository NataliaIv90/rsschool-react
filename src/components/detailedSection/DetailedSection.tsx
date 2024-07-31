import { JSX } from 'react';
import { useRouter } from 'next/router';

import { useGetCharacterDataQuery } from '@/redux/slices/starWarsApiSlice';
import { useLoading } from '@/shared/hooks';

import { CardWrapper } from './cardWrapper';
import { RouteError } from '../routeError';

export const DetailedView = (): JSX.Element => {
  const router = useRouter();
  const { id, page = '1' } = router.query;

  const {
    data: character,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetCharacterDataQuery({
    id: id as string,
  });

  const handleClose = () => {
    router.push(`/?page=${page}`);
  };

  useLoading(isLoading, isFetching);

  if (isError) {
    return <RouteError currentError={error} />;
  }

  return <CardWrapper character={character} handleClose={handleClose} />;
};
