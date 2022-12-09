import Head from 'next/head';
import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { AppLayout } from '../src/components/app-layout';

function IndexPage({ AUTH_TOKEN: string }) {
  const [authToken, setAuthToken] = React.useState(AUTH_TOKEN);

  React.useEffect(() => {
    (async () => {
      if (!authToken) {
        window.location.replace('/signin');
      }

    })()
  }, [])

  if (!authToken) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <>
      <Head>
        <title>
          Home | PU Meet
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>

        </Container>
      </Box>
    </>
  )
}

IndexPage.getInitialProps = async ({req}) => {
    if (req) {
      // server
      return { AUTH_TOKEN: '' };
    } else {
    // client
      return { AUTH_TOKEN: localStorage.getItem("AUTH_TOKEN") }    
    }
  }

IndexPage.getLayout = (page: any) => (
  <AppLayout>
    {page}
  </AppLayout>
)

export default IndexPage;
