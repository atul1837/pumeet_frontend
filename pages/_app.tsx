import Head from 'next/head';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../src/theme';
import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = (props: any) => {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
      <>
        <Head>
          <title>
            PU Meet Dashboard
          </title>
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </>
  );
};

export default App;
