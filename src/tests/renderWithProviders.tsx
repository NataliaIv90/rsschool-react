import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import {
  configureStore,
  PreloadedStateShapeFromReducersMapObject,
} from '@reduxjs/toolkit';

import { ThemeProvider } from '../shared/context/themeContext/ThemeContext';
import { rootReducer, RootState } from '../redux/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  initialState?: PreloadedStateShapeFromReducersMapObject<RootState>;
  store?: ReturnType<typeof configureStore>;
}

const renderWithProviders = (
  ui: ReactElement,
  {
    initialState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  return render(
    <Provider store={store}>
      <ThemeProvider>{ui}</ThemeProvider>
    </Provider>,
    renderOptions
  );
};

export default renderWithProviders;
