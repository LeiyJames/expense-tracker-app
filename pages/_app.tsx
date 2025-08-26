import type { AppProps } from 'next/app';
import { ThemeProvider } from '../context/ThemeContext';
import { DataProvider } from '../context/DataContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </ThemeProvider>
  );
}
