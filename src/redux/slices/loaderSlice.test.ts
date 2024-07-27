import { describe, expect, it } from 'vitest';
import loaderReducer, { startLoading, stopLoading } from './loaderSlice';
import { TLoaderState } from './loaderSlice';

describe('loaderSlice', () => {
  const initialState: TLoaderState = { isLoading: false };

  it('should handle initial state', () => {
    expect(loaderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle startLoading', () => {
    const previousState: TLoaderState = { isLoading: false };
    expect(loaderReducer(previousState, startLoading())).toEqual({
      isLoading: true,
    });
  });

  it('should handle stopLoading', () => {
    const previousState: TLoaderState = { isLoading: true };
    expect(loaderReducer(previousState, stopLoading())).toEqual({
      isLoading: false,
    });
  });
});
