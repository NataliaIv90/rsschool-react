import { ReactNode } from 'react';

import { ErrorBoundary } from '@/components/errorBoundary';
import { metadata } from '@/assets/metadata';
import { ReduxProvider } from '@/redux/ReduxProvider';

import '@/styles/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <ReduxProvider>{children}</ReduxProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
