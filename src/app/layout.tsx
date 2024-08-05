import { ReactNode } from 'react';

import { ErrorBoundary } from '@/components/errorBoundary';
import { ReduxProvider } from '@/redux/ReduxProvider';

import '@/styles/globals.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'React 2024 Q3 - Natalia Ivantsova',
  description:
    'This project is created during React 2024 Q3 course (RS School)',
};

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
