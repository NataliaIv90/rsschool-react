import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '../shared/context/themeContext/ThemeContext';
import { store } from '../redux/store';

const renderWithProviders = (ui: ReactElement, options?: RenderOptions) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>{ui}</ThemeProvider>
      </BrowserRouter>
    </Provider>,
    options
  );
};

export default renderWithProviders;
