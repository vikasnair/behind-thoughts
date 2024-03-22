import useCurrentTheme from '@/lib/hooks/useCurrentTheme';
import '@/styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  const theme = useCurrentTheme();

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
