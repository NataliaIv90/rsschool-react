import { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentProps } from 'next/document';
import { metadata } from '../assets/metadata';

export default function Document(props: DocumentProps) {
  // const title: string = (metadata.title as string) || 'Next project';
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        {/* <title>{title}</title> */}
        <meta name="description" content={metadata.description as string} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
