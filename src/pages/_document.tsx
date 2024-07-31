import { DocumentProps, Html, Head, Main, NextScript } from 'next/document';

import { metadata } from '../assets/metadata';

export default function Document(props: DocumentProps) {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <meta name="description" content={metadata.description as string} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
