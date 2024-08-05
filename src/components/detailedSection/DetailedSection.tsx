'use client';

import { JSX } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useGetCharacterDataQuery } from '@/redux/slices';
import { useLoading } from '@/shared/hooks';

import { CardWrapper } from './cardWrapper';
import { RouteError } from '../routeError';

export const DetailedView = (): JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const page = searchParams.get('page') ?? '1';

  const queryResult = useGetCharacterDataQuery({ id: id as string });
  const {
    data: character,
    isLoading,
    isFetching,
    isError,
    error,
  } = queryResult;

  useLoading(isLoading, isFetching);

  if (!id) {
    return <RouteError currentError={{ message: 'Character ID is missing' }} />;
  }

  if (isError) {
    return <RouteError currentError={error} />;
  }

  const handleClose = () => {
    router.push(`/?page=${page}`);
  };

  return <CardWrapper character={character} handleClose={handleClose} />;
};
