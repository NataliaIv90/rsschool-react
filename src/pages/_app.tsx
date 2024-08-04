import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

import { metadata } from '@/assets/metadata';
import { store } from '@/redux/store';
import { ThemeProvider } from '@/shared/context';

import { ErrorBoundary } from '@/components/errorBoundary';
import { PageWrapper } from '@/components/pageWrapper';

import '@/styles/globals.css';

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
            <PageWrapper>
              <Component {...pageProps} />
            </PageWrapper>
          </>
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
