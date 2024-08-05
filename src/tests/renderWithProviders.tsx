import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import { createMockRouter } from './mocks/createMockRouter';
import { rootReducer, RootState } from '@/redux/store';
import { ThemeProvider } from '@/shared/context';
import { starWarsApiSlice as starWarsApi } from '@/redux/slices';
import { vi } from 'vitest';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  initialState?: Partial<RootState>;
  store?: ReturnType<typeof configureStore>;
}

const mockPush = vi.fn();

export const renderWithProviders = (
  ui: ReactElement,
  {
    initialState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(starWarsApi.middleware),
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const router = createMockRouter({ query: { page: '1' }, push: mockPush });
  return render(
    <RouterContext.Provider value={router}>
      <Provider store={store}>
        <ThemeProvider>{ui}</ThemeProvider>
      </Provider>
    </RouterContext.Provider>,
    renderOptions
  );
};
