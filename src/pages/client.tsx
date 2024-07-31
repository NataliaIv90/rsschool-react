'use client';

import dynamic from 'next/dynamic';

const App = dynamic(() => import('../components/app/App'), { ssr: false });

export function ClientOnly() {
  return <App />;
}

export default ClientOnly;
