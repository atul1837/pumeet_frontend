import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { AppLayout } from '../src/components/app-layout';

function IndexPage() {
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
  );
}

IndexPage.getLayout = (page: any) => (
  <AppLayout>
    {page}
  </AppLayout>
)

export default IndexPage;
