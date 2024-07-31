import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/shared/context';
import { store } from '@/redux/store';
import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary';
import '@/styles/globals.css';
import Head from 'next/head';
import { metadata } from '@/assets/metadata';

const App = ({ Component, pageProps }: AppProps) => {
  const title: string = (metadata.title as string) || 'Next project';

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <>
            <Head>
              <title>{title}</title>
            </Head>
            <Component {...pageProps} />
          </>
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
