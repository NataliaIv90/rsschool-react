'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { stopLoading, startLoading } from '../../redux/slices/loaderSlice';

export const useLoading = (isLoading: boolean, isFetching: boolean) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFetching || isLoading) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  }, [isFetching, isLoading, dispatch]);
};
