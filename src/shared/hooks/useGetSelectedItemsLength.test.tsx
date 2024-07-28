import React from 'react';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemDetailsReducer, {
  SelectedItemsDetailsState,
} from '../../redux/slices/selectedItemsDetailsSlice';
import { useGetSelectedItemsNumber } from './useGetSelectedItemsLength';
import { render } from '@testing-library/react';
import { mockedCharacter } from '../../tests/mocks/mock';

type MockRootState = {
  selectedItemDetails: SelectedItemsDetailsState;
};

const TestComponent = (): React.JSX.Element => {
  const selectedItemsNumber = useGetSelectedItemsNumber();
  return <div>Selected Items: {selectedItemsNumber}</div>;
};

describe('useGetSelectedItemsNumber', () => {
  it('returns 0 when no items are selected', () => {
    const store = configureStore({
      reducer: {
        selectedItemDetails: selectedItemDetailsReducer,
      },
      preloadedState: {
        selectedItemDetails: {
          items: {},
        },
      } as MockRootState,
    });

    const { getByText } = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    expect(getByText('Selected Items: 0')).toBeInTheDocument();
  });

  it('returns the correct number of selected items', () => {
    const store = configureStore({
      reducer: {
        selectedItemDetails: selectedItemDetailsReducer,
      },
      preloadedState: {
        selectedItemDetails: {
          items: {
            item1: mockedCharacter,
            item2: mockedCharacter,
          },
        },
      } as MockRootState,
    });

    const { getByText } = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    expect(getByText('Selected Items: 2')).toBeInTheDocument();
  });
});
