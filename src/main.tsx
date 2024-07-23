import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from './shared/context/themeContext/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
