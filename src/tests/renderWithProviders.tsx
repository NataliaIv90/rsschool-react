import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {
  configureStore,
  PreloadedStateShapeFromReducersMapObject,
} from '@reduxjs/toolkit';

import { ThemeProvider } from '../shared/context/themeContext/ThemeContext';
import { rootReducer, store as defaultStore, RootState } from '../redux/store';

// Define the type for your custom render options
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  initialState?: PreloadedStateShapeFromReducersMapObject<RootState>;
  store?: typeof defaultStore;
}

const renderWithProviders = (
  ui: ReactElement,
  {
    initialState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>{ui}</ThemeProvider>
      </BrowserRouter>
    </Provider>,
    renderOptions
  );
};

export default renderWithProviders;

// import { render, RenderOptions } from '@testing-library/react';
// import { ReactElement } from 'react';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';

// import { ThemeProvider } from '../shared/context/themeContext/ThemeContext';
// import { store } from '../redux/store';

// const renderWithProviders = (ui: ReactElement, options?: RenderOptions) => {
//   return render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <ThemeProvider>{ui}</ThemeProvider>
//       </BrowserRouter>
//     </Provider>,
//     options
//   );
// };

// export default renderWithProviders;
