import useCurrentTheme from '@/lib/hooks/useCurrentTheme';
import '@/styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  const theme = useCurrentTheme();

  return (
    <ThemeProvider theme={theme}>
      {process.env.NODE_ENV === 'production' && <Analytics />}

      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
