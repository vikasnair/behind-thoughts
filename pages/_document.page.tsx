import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap')
        </style>
      </Head>

      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
