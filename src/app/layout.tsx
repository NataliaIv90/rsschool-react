import { ReactNode } from 'react';

import { metadata } from '@/assets/metadata';
import { ReduxProvider } from '@/redux/ReduxProvider';

import '@/styles/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
